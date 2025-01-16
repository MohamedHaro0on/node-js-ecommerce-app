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
  getSubCategoriesSchema,
} from "../joi/subCategory.joi.js";
import SubCategoryModel from "../model/subCategory.model.js";
import checkIfExists from "../../../middleswares/check.if.exists.js";
import CategoryModel from "../../category/model/category.model.js";
import slugifyMiddleWare from "../../../middleswares/slugifiy.js";

const SubCategoryRoutes = Router();

SubCategoryRoutes.post(
  "/create-subcategory",
  validateRequest(createSubCategotySchema),
  checkIfExists(CategoryModel, "mainCategoryId", "_id", true),
  // checkIfExists(SubCategoryModel, "name", "name", false),
  slugifyMiddleWare,
  createSubCategory
);
SubCategoryRoutes.get(
  "/get-subcategories",
  validateRequest(getSubCategoriesSchema),
  getSubCategories
);
SubCategoryRoutes.put(
  "/edit-subcategory",
  validateRequest(editSubCategorySchema),
  checkIfExists(CategoryModel, "mainCategoryId", "_id", true),
  checkIfExists(SubCategoryModel, "id", "_id", true),
  slugifyMiddleWare,
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
