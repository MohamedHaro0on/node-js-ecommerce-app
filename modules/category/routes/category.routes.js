import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryByName,
  getCategoryById,
} from "../controller/category.controller.js";
import paginate from "../../../middleswares/pagination.js";
import validateRequest from "../../../middleswares/validate.request.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  editCategorySchema,
  getCategoryByIdSchema,
  // getCategoryByNameSchema,
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
// categoryRouter.get(
//   "/get-category/:name",
//   validateRequest(getCategoryByNameSchema), // Unable to use ValidateRequest ( because the data is on the query );
//   getCategoryByName
// );

// Get Specfic Category by Id
categoryRouter.get(
  "/get-category/:id",
  validateRequest(getCategoryByIdSchema),
  getCategoryById
);

// Update Category ;
categoryRouter.put(
  "/update-category",
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
