import Joi from "joi";

const createPromoCodeSchema = {
  body: Joi.object({
    code: Joi.string().required().max(10),
    discountPercentage: Joi.number().integer().max(100).required(),
  }).required(),
};

const getPromoCodesSchema = {
  query: Joi.object({ page: Joi.number(), limit: Joi.number() }).optional(),
};

export { createPromoCodeSchema, getPromoCodesSchema };
