import Joi from "joi";

const removeFromShoppingListSchema = {
  params: Joi.object({
    productId: Joi.number().required(),
  }).required(),
};

const addToShoppingListSchema = {
  body: Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().optional(),
  }).required(),
};

const applyPromoCodeSchema = {
  body: Joi.object({
    code: Joi.string().required(),
  }).required(),
};

const getShoppingListSchema = {
  query: Joi.object({ page: Joi.number(), limit: Joi.number() }).optional(),
};

export {
  removeFromShoppingListSchema,
  getShoppingListSchema,
  addToShoppingListSchema,
  applyPromoCodeSchema,
};
