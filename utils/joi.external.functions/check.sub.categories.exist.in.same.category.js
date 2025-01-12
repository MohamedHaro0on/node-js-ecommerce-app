import mongoose from "mongoose";
import SubCategoryModel from "../../modules/subcategory/model/subCategory.model.js";
import ApiError from "../api.error.js";
import { StatusCodes } from "http-status-codes";
import CategoryModel from "../../modules/category/model/category.model.js";

const CheckSubCategoryExistInTheSameCategory = async (
  subCategoryId,
  category
) => {
  try {
    const subCategory = await SubCategoryModel.findById(subCategoryId);
    // Check if the subCategory exists and belongs to the category
    const subCategoryExistsInTheParentCategory = await SubCategoryModel.findOne(
      {
        _id: subCategory._id,
        mainCategoryId: category._id,
      }
    );

    if (!subCategoryExistsInTheParentCategory) {
      throw new ApiError(
        `SubCategory with name " ${subCategory.name} "  not found or does not belong to the specified category " ${category.name} "`,
        StatusCodes.BAD_REQUEST
      );
    }

    return subCategoryId;
  } catch (error) {
    throw new Error(error.message); // Propagate the error
  }
};

const CheckSubCategoriesExistInTheSameCategory = async (
  subCategoryIds,
  helper
) => {
  try {
    const categoryId = helper.state.ancestors[0].category;
    const category = await CategoryModel.findById(categoryId);

    // Validate each subCategoryId
    for (const subCategoryId of subCategoryIds) {
      await CheckSubCategoryExistInTheSameCategory(subCategoryId, category);
    }

    return subCategoryIds; // Return the valid subCategoryIds
  } catch (error) {
    throw new ApiError(error.message, StatusCodes.BAD_REQUEST); // Propagate the error
  }
};

export default CheckSubCategoriesExistInTheSameCategory;
