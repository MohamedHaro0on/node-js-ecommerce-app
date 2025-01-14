import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  // getProductsByName,
  getProductById,
  applyFilter,
} from "../controller/product.controller.js";
import validateRequest from "../../../middleswares/validate.request.js";
import {
  createProductSchema,
  deleteProductSchema,
  editProductSchema,
  getProductByIdSchema,
  getProductsSchema,
} from "../joi/product.joi.js";
import checkIfExists from "../../../middleswares/check.if.exists.js";
import ProductModel from "../model/product.model.js";
import paginateForGetRequests from "../../../middleswares/pagination.js";

const productRoutes = express.Router();

// Custom middleware to apply paginate only to GET requests
productRoutes.use((req, res, next) =>
  paginateForGetRequests(req, res, next, ProductModel)
);
productRoutes.use(paginateForGetRequests);

// Create New Product
productRoutes.post(
  "/create-product",
  validateRequest(createProductSchema),
  createProduct
);

// Get All products
productRoutes.get(
  "/get-products",
  validateRequest(getProductsSchema),
  applyFilter,
  getProducts
);

// // Get Specfic Products By Name ;
// productRoutes.get(
//   "/get-products-by-name",
//   validateRequest(getProductsByNameSchema),
//   getProductsByName
// );

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
