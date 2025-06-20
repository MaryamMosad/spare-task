import { NextFunction, Request, Response } from "express";
import shoppingListService from "../services";
import { paginateConditions } from "../../_common/pagination";

const addToShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqBody = req.body;

  const createRes = await shoppingListService.addToShoppingList({
    quantity: 1, //as default and will be overriden by the req body if it's present
    ...reqBody,
  });
  res.status(201).json({ data: createRes });
};

const removeFromShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  await shoppingListService.removeFromShoppingList(+productId);
  res.status(204).end();
};

const getShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paginate = paginateConditions(req.query);
  const productsRes = await shoppingListService.getShoppingList(paginate);
  res.status(200).json(productsRes);
};

const applyPromoCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const applyPromo = await shoppingListService.applyPromoCode(req.body);
  res.status(201).json({ data: applyPromo });
};

export {
  addToShoppingList,
  removeFromShoppingList,
  getShoppingList,
  applyPromoCode,
};
