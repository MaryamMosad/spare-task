import { faker } from "@faker-js/faker";
import { ShoppingListItem } from "../models/shopping-list-items.model";
import { mockProductList } from "../../products/mocks";
import { Product } from "../../products/models/products.model";

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
  const products = await Product.bulkCreate([
    ...mockProductList(length, { price: faker.number.int({ max: 100 }) }),
  ]);
  const shoppingListItems = products.map((product) =>
    mockShoppingListItems(product.id, { quantity: product.quantity })
  );
  await ShoppingListItem.bulkCreate([...shoppingListItems]);
  return products;
};
