import { paginateConditions } from "../../_common/pagination";
import promoCodeService from "../services";
import { NextFunction, Request, Response } from "express";

const createPromoCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const promoCode = await promoCodeService.createPromoCode(req.body);
  res.status(201).json({ data: promoCode });
};

const promoCodes = async (req: Request, res: Response, next: NextFunction) => {
  const paginate = paginateConditions(req.query);
  const promoCodeRes = await promoCodeService.promoCodes(paginate);
  res.status(200).json(promoCodeRes);
};

export { promoCodes, createPromoCode };
