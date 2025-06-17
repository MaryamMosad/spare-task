import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  products,
  updateProduct,
} from "../controllers";
import { validationMiddleware } from "../../_common/middleware/validation";
import {
  createProductSchema,
  deleteProductSchema,
  productsSchema,
  updateProductSchema,
} from "../validators";

const router = Router();

router.post("/", validationMiddleware(createProductSchema), createProduct);

router.get("/", validationMiddleware(productsSchema), products);

router.patch(
  "/:productId",
  validationMiddleware(updateProductSchema),
  updateProduct
);

router.delete(
  "/:productId",
  validationMiddleware(deleteProductSchema),
  deleteProduct
);

export default router;
