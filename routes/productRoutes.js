import express from "express";
import {
  allProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updatedProduct,
} from "../controllers/productControllers.js";
import { ProtectedRoute } from "../middlewares/protected.js";
import { checkAndRenewToken } from "../middlewares/validate-token.js";

const router = express.Router();

router.post("/create", checkAndRenewToken, createProduct);
router.get("/all-products", checkAndRenewToken, allProducts);
router.get("/:id", getProduct);
router.put("/update/:id", updatedProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
