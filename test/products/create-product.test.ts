import request from "supertest";
import app from "../../src/app";
import { mockProduct } from "../../src/products/mocks";

describe("create product", () => {
  it("create product successfully", async () => {
    const product = mockProduct();
    const res = await request(app).post("/products").send(product);
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeTruthy();
    expect(res.body.data.name).toBe(product.name);
  });

  it("throws error for invalid input", async () => {
    const product = mockProduct({ quantity: "string" });
    const res = await request(app).post("/products").send(product);
    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined()
  });
});
