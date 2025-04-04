import express from "express";
import {
  addProducts,
  getProductById,
  getproducts,
  updateProductByid,
} from "../controllers/Products.js";

const router = express.Router();

router.post("/add", addProducts);
router.get("/", getproducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductByid);

export default router;
