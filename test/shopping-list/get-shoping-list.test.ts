import request from "supertest";
import app from "../../src/app";
import { Product } from "../../src/products/models/products.model";
import { prepareShoppingListItems } from "../../src/shopping-list/mocks";
import { ShoppingListItem } from "../../src/shopping-list/models/shopping-list-items.model";

const calculateFinalPrice = (products) =>
  products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

describe("get shopping list", () => {
  beforeEach(async () => {
    await Product.destroy({ where: {} });
    await ShoppingListItem.destroy({ where: {} });
  });

  it("get shopping list with total price successfully", async () => {
    const products = await prepareShoppingListItems(5);
    const res = await request(app)
      .get(`/shopping-lists`)
      .query({ page: 1, limit: 4 });

    expect(res.status).toBe(200);
    expect(res.body.data).toBeTruthy();
    expect(res.body.metaData).toBeTruthy();
    expect(res.body.totalCount).toBe(5);
    expect(res.body.metaData.finalPrice).toEqual(calculateFinalPrice(products));
  });

  it("shopping list items should be updated after product deletion", async () => {
    const products = await prepareShoppingListItems(6);
    const res = await request(app)
      .get(`/shopping-lists`)
      .query({ page: 1, limit: 4 });

    expect(res.status).toBe(200);
    expect(res.body.totalCount).toBe(6);
    expect(res.body.metaData.finalPrice).toEqual(calculateFinalPrice(products));

    await Product.destroy({ where: { id: products.pop().id } });
    const resAfterDelete = await request(app)
      .get(`/shopping-lists`)
      .query({ page: 1, limit: 4 });
    expect(resAfterDelete.body.totalCount).toBe(5);
    expect(resAfterDelete.body.metaData.finalPrice).toEqual(
      calculateFinalPrice(products)
    );
  });

  it("shopping list items should be updated after product price change", async () => {
    const products = await prepareShoppingListItems(6);
    const res = await request(app)
      .get(`/shopping-lists`)
      .query({ page: 1, limit: 4 });

    expect(res.status).toBe(200);
    expect(res.body.metaData.finalPrice).toEqual(calculateFinalPrice(products));

    await Product.update({ price: 5 }, { where: { id: products[0].id } });
    const resAfterDelete = await request(app)
      .get(`/shopping-lists`)
      .query({ page: 1, limit: 4 });
    products[0].price = 5;
    expect(resAfterDelete.body.metaData.finalPrice).toEqual(
      calculateFinalPrice(products)
    );
  });
});
