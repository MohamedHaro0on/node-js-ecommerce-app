import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
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
import slugifyMiddleWare from "../../../middleswares/slugifiy.js";

const productRouter = express.Router();

// // Custom middleware to apply paginate only to GET requests
// productRouter.use((req, res, next) =>
//   paginateForGetRequests(req, res, next, ProductModel)
// );
// productRouter.use(paginateForGetRequests);

// Create New Product
productRouter.post(
  "/create-product",
  validateRequest(createProductSchema),
  slugifyMiddleWare,
  createProduct
);

// Get All products
productRouter.get(
  "/get-products",
  validateRequest(getProductsSchema),
  getProducts
);

// Get Specfic Product By Id ;
productRouter.get(
  "/get-product",
  validateRequest(getProductByIdSchema),
  getProductById
);

// Update Product ;
productRouter.put(
  "/update-product",
  checkIfExists(ProductModel, "id", "_id", true),
  validateRequest(editProductSchema),
  slugifyMiddleWare,
  updateProduct
);

// Delete Product ;
productRouter.delete(
  "/delete-product",
  validateRequest(deleteProductSchema),
  checkIfExists(ProductModel, "id", "_id", true),
  deleteProduct
);

export default productRouter;
