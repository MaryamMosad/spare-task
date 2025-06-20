import { Router } from "express";
import {
  addToShoppingList,
  removeFromShoppingList,
  getShoppingList,
  applyPromoCode,
} from "../controllers";
import { validationMiddleware } from "../../_common/middleware/validation";
import {
  addToShoppingListSchema,
  removeFromShoppingListSchema,
  getShoppingListSchema,
  applyPromoCodeSchema,
} from "../validators";

const router = Router();

router.post(
  "/",
  validationMiddleware(addToShoppingListSchema),
  addToShoppingList
);

router.get("/", validationMiddleware(getShoppingListSchema), getShoppingList);

router.delete(
  "/:productId",
  validationMiddleware(removeFromShoppingListSchema),
  removeFromShoppingList
);

router.post(
  "/promo-code/apply",
  validationMiddleware(applyPromoCodeSchema),
  applyPromoCode
);

export default router;
