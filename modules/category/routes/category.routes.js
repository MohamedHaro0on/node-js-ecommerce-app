import express from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
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
  getCategory
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
