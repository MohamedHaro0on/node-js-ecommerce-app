import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategory,
} from "../controller/category.controller.js";
import paginate from "../../../middleswares/pagination.js";
import validateRequest from "../../../middleswares/validate.request.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  editCategorySchema,
  getCategorySchema,
} from "../joi/category.joi.js";
import checkIfExists from "../../../middleswares/check.if.exists.js";
import CategoryModel from "../model/category.model.js";
import paginateForGetRequests from "../../../middleswares/pagination.js";

const categoryRoutes = express.Router();

// categoryRoutes.use((req, res, next) =>
//   paginateForGetRequests(req, res, next, CategoryModel)
// );

// Create New Category
categoryRoutes.post(
  "/create-category",
  validateRequest(createCategorySchema),
  checkIfExists(CategoryModel, "name", "name", false),
  createCategory
);

// Get All Categories
categoryRoutes.get("/get-categories", getCategories);

// Get Specfic Category By Name ;
categoryRoutes.get(
  "/get-category",
  validateRequest(getCategorySchema),
  checkIfExists(CategoryModel, "id", "_id", true),
  getCategory
);

// Update Category ;
categoryRoutes.put(
  "/update-category",
  checkIfExists(CategoryModel, "id", "_id", true),
  validateRequest(editCategorySchema),
  updateCategory
);

// Delete Category ;
categoryRoutes.delete(
  "/delete-category/:id",
  validateRequest(deleteCategorySchema),
  checkIfExists(CategoryModel, "id", "_id", true),
  deleteCategory
);

export default categoryRoutes;
