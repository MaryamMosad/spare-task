import request from "supertest";
import app from "../../src/app";
import { mockProduct } from "../../src/products/mocks";
import { Product } from "../../src/products/models/products.model";

describe("delete product", () => {
  beforeEach(async () => await Product.destroy({ where: {} }));

  it("delete product successfully", async () => {
    const product = await Product.create({ ...mockProduct() });
    const res = await request(app).delete(`/products/${product.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toBe(true);
  });

  it("throws error for non-existent product", async () => {
    const res = await request(app).delete(`/products/15566689`);
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
