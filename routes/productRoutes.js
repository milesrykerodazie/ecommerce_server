import express from "express";
import {
  allProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updatedProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.post("create", createProduct);
router.get("/all-products", allProducts);
router.get("/:id", getProduct);
router.put("/update/:id", updatedProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
