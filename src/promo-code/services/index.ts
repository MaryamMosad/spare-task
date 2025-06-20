import { HttpError } from "../../_common/errors/http-error";
import { PromoCode } from "../models/promo-code.model";
import { transformResponse } from "../../_common/pagination";
import { PaginationDto } from "../../_common/pagination/pagination-type";
import { CreatePromoCode } from "../dto";

const createPromoCode = async (input: CreatePromoCode) => {
  try {
    return await PromoCode.create(input);
  } catch (err) {
    if (err.parent.code === "ER_DUP_ENTRY")
      throw new HttpError("Code already exists", 409);
  }
};

const promoCodeOrError = async (code: string) => {
  const promoCode = await PromoCode.findOne({ where: { code } });
  if (!promoCode) throw new HttpError("promo code not found", 404);
  return promoCode;
};

const promoCodes = async (paginate: PaginationDto) => {
  const res = await PromoCode.findAndCountAll({
    limit: paginate.limit,
    offset: paginate.offset,
  });

  return transformResponse(res, paginate);
};

export default { promoCodeOrError, createPromoCode, promoCodes };
