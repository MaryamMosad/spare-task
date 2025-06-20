import request from "supertest";
import app from "../../src/app";
import { mockProduct } from "../../src/products/mocks";
import { Product } from "../../src/products/models/products.model";
import { ShoppingListItem } from "../../src/shopping-list/models/shopping-list-items.model";

describe("Add to shopping list", () => {
  beforeEach(async () => {
    await Product.destroy({ where: {} });
    await ShoppingListItem.destroy({ where: {} });
  });

  it("add product to shopping list successfully", async () => {
    const product = await Product.create({ ...mockProduct({ quantity: 5 }) });
    const res = await request(app)
      .post("/shopping-lists")
      .send({ productId: product.id, quantity: 5 });

    expect(res.status).toBe(201);
    expect(res.body.data).toBeTruthy();

    const productAfterUpdate = await Product.findByPk(product.id);
    expect(productAfterUpdate.quantity).toBe(0);
  });

  it("throws error for unavailble quantity", async () => {
    const product = await Product.create({ ...mockProduct({ quantity: 2 }) });
    const res = await request(app)
      .post("/shopping-lists")
      .send({ productId: product.id, quantity: 5 });

    expect(res.status).toBe(409);
    expect(res.body.message).toBeTruthy();
  });

  it("throws error for unavailble product", async () => {
    const res = await request(app)
      .post("/shopping-lists")
      .send({ productId: 5, quantity: 5 });

    expect(res.status).toBe(404);
    expect(res.body.message).toBeTruthy();
  });
});
