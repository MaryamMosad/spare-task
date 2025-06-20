import request from "supertest";
import app from "../src/app";

describe("Test application Running", () => {
  it("should test the server running", async () => {
    const res = await request(app).get("/");
    expect(res.body).toBe("Hello!");
  });
});
