import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByName,
  getProductById,
} from "../controller/product.controller.js";
import paginate from "../../../middleswares/pagination.js";
import validateRequest from "../../../middleswares/validate.request.js";
import {
  createProductSchema,
  deleteProductSchema,
  editProductSchema,
  getProductByIdSchema,
  getProductsByNameSchema,
} from "../joi/product.joi.js";
import checkIfExists from "../../../middleswares/check.if.exists.js";
import ProductModel from "../model/product.model.js";
import { StatusCodes } from "http-status-codes";

const productRoutes = express.Router();

// Create New Product
productRoutes.post(
  "/create-product",
  validateRequest(createProductSchema),
  createProduct
);

// Get All products
productRoutes.get("/get-products", paginate, getProducts);

// Get Specfic Products By Name ;
productRoutes.get(
  "/get-products-by-name",
  validateRequest(getProductsByNameSchema),
  getProductsByName
);

// Get Specfic Product By Id ;
productRoutes.get(
  "/get-product",
  validateRequest(getProductByIdSchema),
  getProductById
);

// Update Product ;
productRoutes.put(
  "/update-product",
  checkIfExists(ProductModel, "id", "_id", true),
  validateRequest(editProductSchema),
  updateProduct
);

// Delete Product ;
productRoutes.delete(
  "/delete-product",
  validateRequest(deleteProductSchema),
  checkIfExists(ProductModel, "id", "_id", true),
  deleteProduct
);

export default productRoutes;
