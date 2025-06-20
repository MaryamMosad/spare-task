import request from "supertest";
import app from "../../src/app";
import { mockProduct } from "../../src/products/mocks";
import { Product } from "../../src/products/models/products.model";
import { ShoppingListItem } from "../../src/shopping-list/models/shopping-list-items.model";
import { mockShoppingListItems } from "../../src/shopping-list/mocks";

describe("remove product from shopping list", () => {
  beforeEach(async () => {
    await Product.destroy({ where: {} });
    await ShoppingListItem.destroy({ where: {} });
  });

  it("remove product from shopping list successfully", async () => {
    const product = await Product.create({ ...mockProduct({}) });
    const shoppingListItem = await ShoppingListItem.create({
      ...mockShoppingListItems(product.id),
    });

    const res = await request(app).delete(`/shopping-lists/${product.id}`);

    expect(res.status).toBe(204);
    expect(res.body.data).toBeUndefined();

    const productAfterUpdate = await Product.findByPk(product.id);
    expect(productAfterUpdate.quantity).toBe(
      product.quantity + shoppingListItem.quantity
    );
  });

  it("throw error for non existent product in list", async () => {
    const res = await request(app).delete(`/shopping-lists/55`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBeTruthy();
  });
});
