import CategoryModel from "../model/category.model.js";
import deleteHandler from "../../../utils/handlers/delete.handler.js";
import createHandler from "../../../utils/handlers/create.handler.js";
import GetHandler from "../../../utils/handlers/get.handler.js";
import { getSubCategoriesForCategory } from "../../../utils/handlers/get.by.id.handler.js";
import updateHandler from "../../../utils/handlers/update.handler.js";

//          @desc                    Create Category
//          @route                   POST  /create-category
//          @access                  private

export const createCategory = createHandler(CategoryModel);

//          @desc                    Get Categories
//          @route                   GET   /get-categories
//          @access                  public

export const getCategories = GetHandler(CategoryModel);

//          @desc                    get specfic category by ID  ;
//          @route                   GET /get-category
//          @access                  public

export const getCategory = getSubCategoriesForCategory(CategoryModel);

//          @desc                        Update specfic Category
//          @route                       PUT         /update-category
//          @access                      Private

export const updateCategory = updateHandler(CategoryModel);

//          @desc                        Delete specfic Category
//          @route                       Delete         /update-category
//          @access                      Private

export const deleteCategory = deleteHandler(CategoryModel);
