import { faker } from "@faker-js/faker";
import { Product } from "../models/products.model";

export const mockProduct = (override?: any): Product => {
  return {
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    quantity: faker.number.int({ max: 1000 }),
    ...override,
  };
};

export const mockProductList = (
  length: number,
  override?: any
): Partial<Product>[] => {
  return Array.from({ length }).map(() => mockProduct(override));
};
