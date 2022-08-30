import express from "express";

import {
  getProduct,
  addProduct,
  findProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/product", getProduct);

router.post("/product", addProduct);

router.get("/product/:id",  verifyToken,findProduct);

router.put("/product/:id", verifyToken, updateProduct);

router.delete("/product/:id", verifyToken, deleteProduct);

export default router;
