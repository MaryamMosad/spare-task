import { Transaction } from "sequelize";
import { HttpError } from "../../_common/errors/http-error";
import { transformResponse } from "../../_common/pagination";
import { PaginationDto } from "../../_common/pagination/pagination-type";
import { AddToShoppingListDto } from "../../shopping-list/dto";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { Product } from "../models/products.model";

const createProduct = async (input: CreateProductDto) => {
  return await Product.create(input);
};

const deleteProduct = async (productId: number) => {
  await productOrError(productId);
  return !!(await Product.destroy({ where: { id: productId } }));
};

const productOrError = async (productId: number) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new HttpError("product not found", 404);
  return product;
};

const updateProduct = async (productId: number, input: UpdateProductDto) => {
  await productOrError(productId);
  return !!(
    await Product.update(
      { ...input },
      { where: { id: productId }, returning: true }
    )
  )[1];
};

const products = async (paginate: PaginationDto) => {
  const res = await Product.findAndCountAll({
    limit: paginate.limit,
    offset: paginate.offset,
  });

  return transformResponse(res, paginate);
};

const decreaseProductQuantity = async (
  input: AddToShoppingListDto,
  transaction: Transaction
) => {
  await Product.decrement("quantity", {
    by: input.quantity,
    transaction,
    where: { id: input.productId },
  });
};

const validateProductAvailability = async (input: AddToShoppingListDto) => {
  const product = await productOrError(input.productId);
  if (product.quantity < input.quantity)
    throw new HttpError("Not enough stock", 409);
};

const increaseProductQuantity = async (
  input: AddToShoppingListDto,
  transaction: Transaction
) => {
  await Product.increment("quantity", {
    by: input.quantity,
    transaction,
    where: { id: input.productId },
  });
};

export default {
  createProduct,
  deleteProduct,
  updateProduct,
  products,
  decreaseProductQuantity,
  validateProductAvailability,
  increaseProductQuantity,
};
