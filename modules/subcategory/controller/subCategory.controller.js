import SubCategoryModel from "../model/subCategory.model.js";
import deleteHandler from "../../../utils/handlers/delete.handler.js";
import updateHandler from "../../../utils/handlers/update.handler.js";
import createHandler from "../../../utils/handlers/create.handler.js";
import GetByIdHandler from "../../../utils/handlers/get.by.id.handler.js";
import GetHandler from "../../../utils/handlers/get.handler.js";

//          @desc                    get  subcategories ;
//          @route                   get /subcategories/
//          @access                  public
export const getSubCategories = GetHandler(SubCategoryModel);
//          @desc                    get  subcategories ;
//          @route                   get /subcategories/
//          @access                  public
export const getSubCategotyById = GetByIdHandler(SubCategoryModel, {
  path: "mainCategoryId",
  select: "name -_id",
});
//          @desc                    Create a subcategory ;
//          @route                   Post /subcategories/create
//          @access                  private

export const createSubCategory = createHandler(SubCategoryModel);

//          @desc                    edit specfic category  by Name ;
//          @route                   edit /subcategories/edit
//          @access                  private
export const editSubCategory = updateHandler(SubCategoryModel);

//          @desc                    delete  subcategory ;
//          @route                   delete /delete-subcategory
//          @access                  private
export const deleteSubCategory = deleteHandler(SubCategoryModel);
