import express from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller.js";
import paginate from "../../../middleswares/pagination.js";
import CategoryModel from "../model/category.model.js";

const categroryRouter = express.Router();

categroryRouter.post("/create-category", createCategory);
categroryRouter.get("/get-categories", paginate, getCategories);
categroryRouter.get("/get-category", getCategory);
categroryRouter.put("/update-category", updateCategory);
categroryRouter.delete("/delete-category", deleteCategory);
// categroryRouter.route("/").get(getCategory).post(createCategory)
export default categroryRouter;
