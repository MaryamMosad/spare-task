import { PaginationDto } from "../../_common/pagination/pagination-type";
import { AddToShoppingListDto } from "../dto";
import { sequelize } from "../../_common/database/db-connection";
import { ShoppingListItem } from "../models/shopping-list.model";
import productService from "../../products/services";
import { HttpError } from "../../_common/errors/http-error";
import { transformResponse } from "../../_common/pagination";
import { fn, literal } from "sequelize";
import { Product } from "../../products/models/products.model";

const addToShoppingList = async (input: AddToShoppingListDto) => {
  await productService.validateProductAvailability(input);

  const itemQuantityInList = await getItemQuantityInList(input.productId);
  return await sequelize.transaction(async (transaction) => {
    if (!itemQuantityInList) {
      await ShoppingListItem.create(input, { transaction });
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
    attributes: ["quantity"],
  });

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
  return { totalPrice, ...transformResponse(res, paginate) };
};

export default { addToShoppingList, removeFromShoppingList, getShoppingList };
