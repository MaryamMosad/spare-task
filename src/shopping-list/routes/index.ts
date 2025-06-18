import { Router } from "express";
import {
  addToShoppingList,
  removeFromShoppingList,
  getShoppingList,
} from "../controllers";
import { validationMiddleware } from "../../_common/middleware/validation";
import {
  addToShoppingListSchema,
  removeFromShoppingListSchema,
  getShoppingListSchema,
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

export default router;
