import { Router } from "express";
import paginate from "../../../middleswares/pagination.js";
import validateRequest from "../../../middleswares/validate.request.js";
import {
  createSubCategory,
  editSubCategory,
} from "../controller/subCategory.controller.js";

const SubCategoryRoutes = Router();

SubCategoryRoutes.post("/create-subcategory", createSubCategory);
SubCategoryRoutes.put("/edit-subcategory", editSubCategory);
export default SubCategoryRoutes;
