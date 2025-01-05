import { Router } from "express";
import paginate from "../../../middleswares/pagination.js";
import validateRequest from "../../../middleswares/validate.request.js";
import {
  createSubCategory,
  deleteSubCategory,
  editSubCategory,
  getSubCategotyById,
  getSubCategories,
} from "../controller/subCategory.controller.js";
import {
  createSubCategotySchema,
  editSubCategorySchema,
  getSubCategotyByIdSchema,
  deleteSubCategotySchema,
} from "../joi/subCategory.joi.js";
import SubCategoryModel from "../model/subCategory.model.js";
import checkIfExists from "../../../middleswares/check.if.exists.js";
import CategoryModel from "../../category/model/category.model.js";

const SubCategoryRoutes = Router();

SubCategoryRoutes.post(
  "/create-subcategory",
  validateRequest(createSubCategotySchema),
  checkIfExists(CategoryModel, "mainCategoryId", "_id", true),
  // checkIfExists(SubCategoryModel, "name", "name", false),
  createSubCategory
);
SubCategoryRoutes.put(
  "/edit-subcategory",
  validateRequest(editSubCategorySchema),
  checkIfExists(CategoryModel, "categoryId", "_id", true),
  checkIfExists(SubCategoryModel, "subCategoryId", "_id", true),
  editSubCategory
);
SubCategoryRoutes.get("/get-subcategories", paginate, getSubCategories);
SubCategoryRoutes.get(
  "/get-subcategory/:id",
  validateRequest(getSubCategotyByIdSchema),
  checkIfExists(SubCategoryModel, "id", "_id", true),
  getSubCategotyById
);

SubCategoryRoutes.delete(
  "/delete-subcategory/:id",
  validateRequest(deleteSubCategotySchema),
  checkIfExists(SubCategoryModel, "id", "_id", true),
  deleteSubCategory
);
export default SubCategoryRoutes;
