import { NextFunction, Request, Response } from "express";
import productService from "../services";
import { paginateConditions } from "../../_common/pagination";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json({ data: product });
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  const product = await productService.updateProduct(+productId, req.body);
  res.status(200).json({ data: product });
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  await productService.deleteProduct(+productId);
  res.status(204).end();
};

const products = async (req: Request, res: Response, next: NextFunction) => {
  const paginate = paginateConditions(req.query);
  const productsRes = await productService.products(paginate);
  res.status(200).json(productsRes);
};

export { createProduct, updateProduct, deleteProduct, products };
