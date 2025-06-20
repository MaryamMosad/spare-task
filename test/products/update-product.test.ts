import request from "supertest";
import app from "../../src/app";
import { mockProduct } from "../../src/products/mocks";
import { Product } from "../../src/products/models/products.model";

describe("update product", () => {
  beforeEach(async () => await Product.destroy({ where: {} }));

  it("update product successfully", async () => {
    const product = await Product.create({ ...mockProduct() });
    const newName = "random new name";
    const res = await request(app)
      .patch(`/products/${product.id}`)
      .send({ name: newName });

    expect(res.status).toBe(200);
    expect(res.body.data).toBe(true);
    const updatedProduct = await Product.findByPk(product.id);
    expect(updatedProduct.name).toBe(newName);
  });

  it("throws error for non-existent product", async () => {
    const res = await request(app)
      .patch(`/products/1555`)
      .send({ name: "random" });
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  it("throws error for invalid input", async () => {
    const product = await Product.create({ ...mockProduct() });
    const res = await request(app)
      .patch(`/products/${product.id}`)
      .send({ price: "xyz" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });
});
