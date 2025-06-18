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
  const deleteRes = await shoppingListService.removeFromShoppingList(
    +productId
  );
  res.status(200).json({ data: deleteRes });
};

const getShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqQuery = req.query;
  const paginate = paginateConditions(reqQuery);
  const productsRes = await shoppingListService.getShoppingList(paginate);
  res.status(200).json(productsRes);
};

export { addToShoppingList, removeFromShoppingList, getShoppingList };
