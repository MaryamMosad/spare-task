import express, { Request, Response } from "express";
import productsRouter from "./products/routes";
import shoppingListRouter from "./shopping-list/routes";
import { errorMiddleware } from "./_common/middleware/error";
import promoCodeRouter from "./promo-code/routes";

const app = express();

app.use(express.json());

app.use("/products/", productsRouter);
app.use("/shopping-lists/", shoppingListRouter);
app.use("/promo-codes/", promoCodeRouter);

app.get("/", (req: Request, res: Response) => {
  res.json("Hello!");
});

app.use(errorMiddleware);

export default app;
