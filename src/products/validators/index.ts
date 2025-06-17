import Joi from "joi";

const createProductSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().required(),
  }).required(),
};

const productsSchema = {
  query: Joi.object({ page: Joi.number(), limit: Joi.number() }).optional(),
};

const deleteProductSchema = {
  params: Joi.object({
    productId: Joi.number().required(),
  }).required(),
};

const updateProductSchema = {
  params: Joi.object({
    productId: Joi.number().required(),
  }).required(),
  body: Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().integer().optional(),
  }).required(),
};

export {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema,
  productsSchema,
};
