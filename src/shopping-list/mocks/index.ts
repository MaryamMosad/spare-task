import { faker } from "@faker-js/faker";
import { ShoppingListItem } from "../models/shopping-list-items.model";
import { mockProductList } from "../../products/mocks";
import { Product } from "../../products/models/products.model";
import { PromoCode } from "../../promo-code/models/promo-code.model";
import { ShoppingList } from "../models/shopping-list.model";

export const mockShoppingListItems = (
  productId: number,
  override?: any
): Partial<ShoppingListItem> => {
  return {
    productId,
    quantity: faker.number.int({ max: 5, min: 1 }),
    ...override,
  };
};

export const prepareShoppingListItems = async (
  length: number
): Promise<Product[]> => {
  const shoppingList = await ShoppingList.create();
  const products = await Product.bulkCreate([
    ...mockProductList(length, { price: faker.number.int({ max: 100 }) }),
  ]);
  const shoppingListItems = products.map((product) =>
    mockShoppingListItems(product.id, {
      quantity: product.quantity,
      shoppingListId: shoppingList.id,
    })
  );
  await ShoppingListItem.bulkCreate([...shoppingListItems]);
  return products;
};

export const preparePromoCodeData = async () => {
  const promoCode = await PromoCode.create({
    code: "50%OFF",
    discountPercentage: 50,
  });

  await ShoppingList.update({ promoCodeId: promoCode.id }, { where: {} });
  return promoCode;
};
