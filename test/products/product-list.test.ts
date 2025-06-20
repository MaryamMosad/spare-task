import request from "supertest";
import app from "../../src/app";
import { mockProductList } from "../../src/products/mocks";
import { Product } from "../../src/products/models/products.model";

describe("product list", () => {
  beforeEach(async () => await Product.destroy({ where: {} }));

  it("get paginated product list successfully", async () => {
    await Product.bulkCreate(mockProductList(20));
    const res = await request(app)
      .get(`/products/`)
      .query({ page: 1, limit: 10 });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(10);
    expect(res.body.totalCount).toBe(20);
  });
});
