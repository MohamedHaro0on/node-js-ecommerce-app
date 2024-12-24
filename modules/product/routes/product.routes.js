import express from "express";
import { getProducts } from "../controller/product.controller.js";
const ProductRoutes = express.Router();

ProductRoutes.get("/get-product", getProducts);

export default ProductRoutes;
