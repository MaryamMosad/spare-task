import { PaginationDto } from "../../_common/pagination/pagination-type";
import { AddToShoppingListDto } from "../dto";
import { sequelize } from "../../_common/database/db-connection";
import { ShoppingListItem } from "../models/shopping-list-items.model";
import productService from "../../products/services";
import { HttpError } from "../../_common/errors/http-error";
import { transformResponse } from "../../_common/pagination";
import { fn, literal } from "sequelize";
import { Product } from "../../products/models/products.model";
import { ShoppingList } from "../models/shopping-list.model";
import { PromoCode } from "../../promo-code/models/promo-code.model";

const addToShoppingList = async (input: AddToShoppingListDto) => {
  await productService.validateProductAvailability(input);

  const shoppingList = await getCurrentShoppingList();
  const itemQuantityInList = await getItemQuantityInList(input.productId);
  return await sequelize.transaction(async (transaction) => {
    if (!itemQuantityInList) {
      await ShoppingListItem.create(
        { ...input, shoppingListId: shoppingList.id },
        { transaction }
      );
    } else {
      await ShoppingListItem.update(
        {
          quantity: itemQuantityInList + input.quantity,
        },
        { where: { productId: input.productId }, transaction }
      );
    }
    await productService.decreaseProductQuantity(input, transaction);
    return true;
  });
};

const removeFromShoppingList = async (productId: number) => {
  const itemQuantityInList = await getItemQuantityInList(productId);

  if (!itemQuantityInList) throw new HttpError("Item is not in the list", 404);
  return await sequelize.transaction(async (transaction) => {
    await ShoppingListItem.destroy({ where: { productId }, transaction });
    await productService.increaseProductQuantity(
      { productId, quantity: itemQuantityInList },
      transaction
    );
    return true;
  });
};

const getItemQuantityInList = async (productId: number) => {
  const shoppingListItem = await ShoppingListItem.findOne({
    where: { productId },
  });

  if (!shoppingListItem) return 0;

  return shoppingListItem.quantity;
};

const getShoppingList = async (paginate: PaginationDto) => {
  const res = await ShoppingListItem.findAndCountAll({
    limit: paginate.limit,
    offset: paginate.offset,
    include: [{ model: Product, attributes: ["id", "name", "price"] }],
    attributes: ["quantity", "shoppingListId"],
  });

  const totalPrice = await getShoppingListTotalPrice();

  return { totalPrice, ...transformResponse(res, paginate) };
};

const getShoppingListTotalPrice = async () => {
  const total = await ShoppingListItem.findAll({
    attributes: [
      [
        fn("SUM", literal("`ShoppingListItem`.`quantity` * `product`.`price`")),
        "totalPrice",
      ],
    ],
    include: [
      {
        model: Product,
        attributes: [],
        required: true,
      },
    ],
    raw: true,
  });

  const totalPrice = total[0]["totalPrice"] ?? 0;

  const discountPercentage = await getShoppingListDiscountPercentage();

  if (discountPercentage) return totalPrice * (100 - discountPercentage);
  return totalPrice;
};

/** Shopping list logic is working under the assumpion that
 *  there's only one user with only one shopping list
 */

const getCurrentShoppingList = async () => {
  const list = await ShoppingList.findOne({});
  if (list) return list;
  return await ShoppingList.create({});
};

const getShoppingListDiscountPercentage = async () => {
  const shoppingList = await ShoppingList.findOne({ include: [PromoCode] });
  return shoppingList?.promoCode?.discountPercentage ?? 0;
};

export default { addToShoppingList, removeFromShoppingList, getShoppingList };
