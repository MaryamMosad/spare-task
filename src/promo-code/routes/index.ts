import { Router } from "express";
import { createPromoCode, promoCodes } from "../controllers";
import { validationMiddleware } from "../../_common/middleware/validation";
import { createPromoCodeSchema, getPromoCodesSchema } from "../validators";

const router = Router();

router.post("/", validationMiddleware(createPromoCodeSchema), createPromoCode);

router.get("/", validationMiddleware(getPromoCodesSchema), promoCodes);

export default router;
