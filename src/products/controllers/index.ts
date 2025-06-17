import { NextFunction, Request, Response } from "express";
import productService from "../services";
import { paginateConditions } from "../../_common/pagination";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  const product = await productService.updateProduct(+productId, req.body);
  res.status(200).json(product);
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  const deleteRes = await productService.deleteProduct(+productId);
  res.status(200).json(deleteRes);
};

const products = async (req: Request, res: Response, next: NextFunction) => {
  const reqQuery = req.query;
  const paginate = paginateConditions(reqQuery);
  const productsRes = await productService.products(paginate);
  res.status(200).json(productsRes);
};

export { createProduct, updateProduct, deleteProduct, products };
