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

categoryRouter.post(
  "/create-category",
  validateRequest(createCategorySchema),
  createCategory
);
categoryRouter.get("/get-categories", paginate, getCategories);
categoryRouter.get(
  "/get-category",
  validateRequest(getCategorySchema),
  getCategoryByName
);
categoryRouter.get(
  "/get-category/:id",
  validateRequest(getCategorySchema),
  getCategoryById
);
categoryRouter.put(
  "/update-category",
  validateRequest(editCategorySchema),
  updateCategory
);
categoryRouter.delete(
  "/delete-category",
  validateRequest(deleteCategorySchema),
  deleteCategory
);
export default categoryRouter;
