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
  getCategorySchema,
} from "../joi/category.joi.js";

const categoryRouter = express.Router();

// Create New Category
categoryRouter.post(
  "/create-category",
  validateRequest(createCategorySchema),
  createCategory
);

// Get All Categories
categoryRouter.get("/get-categories", paginate, getCategories);

// Get Specfic Category By Name ;
categoryRouter.get(
  "/get-category",
  validateRequest(getCategorySchema),
  getCategoryByName
);

// Get Specfic Category by Id
categoryRouter.get(
  "/get-category/:id",
  validateRequest(getCategorySchema),
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
  "/delete-category",
  validateRequest(deleteCategorySchema),
  deleteCategory
);

export default categoryRouter;
