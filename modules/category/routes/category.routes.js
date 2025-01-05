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

const categoryRouter = express.Router();

// Create New Category
categoryRouter.post(
  "/create-category",
  validateRequest(createCategorySchema),
  checkIfExists(CategoryModel, "name", "name", false),
  createCategory
);

// Get All Categories
categoryRouter.get("/get-categories", paginate, getCategories);

// Get Specfic Category By Name ;
categoryRouter.get(
  "/get-category",
  validateRequest(getCategorySchema),
  getCategory
);

// Update Category ;
categoryRouter.put(
  "/update-category",
  checkIfExists(CategoryModel, "id", "_id", true),
  validateRequest(editCategorySchema),
  updateCategory
);

// Delete Category ;
categoryRouter.delete(
  "/delete-category/:id",
  validateRequest(deleteCategorySchema),
  checkIfExists(CategoryModel, "id", "_id", true),
  deleteCategory
);

export default categoryRouter;
