import mongoose from "mongoose";
import SubCategoryModel from "../../modules/subcategory/model/subCategory.model.js";
import ApiError from "../api.error.js";
import { StatusCodes } from "http-status-codes";

const CheckSubCategoryExistInTheSameCategory = async (
  subCategoryId,
  categoryId
) => {
  try {
    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
    const subCategoryObjectId = new mongoose.Types.ObjectId(subCategoryId);

    // Check if the subCategory exists and belongs to the category
    const subCategory = await SubCategoryModel.findOne({
      _id: subCategoryObjectId,
      mainCategoryId: categoryObjectId,
    });

    if (!subCategory) {
      throw new ApiError(
        `SubCategory with ID ${subCategoryId} not found or does not belong to the specified category ${categoryId}`,
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

    // Validate each subCategoryId
    for (const subCategoryId of subCategoryIds) {
      await CheckSubCategoryExistInTheSameCategory(subCategoryId, categoryId);
    }

    return subCategoryIds; // Return the valid subCategoryIds
  } catch (error) {
    throw new ApiError(error.message, StatusCodes.BAD_REQUEST); // Propagate the error
  }
};

export default CheckSubCategoriesExistInTheSameCategory;
