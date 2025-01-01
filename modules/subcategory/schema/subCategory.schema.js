import mongoose from "mongoose";
import CategoryModel from "../../category/model/category.model.js";
import asyncHandler from "express-async-handler";
import ApiError from "../../../utils/api.error.js";
import { StatusCodes } from "http-status-codes";
import SubCategoryModel from "../model/subCategory.model.js";

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Sub Category Name is Too Short"],
      maxLength: [20, "Sub Cateory  Name is Too Long"],
      unique: [true, "SubCategory Must be Unique"],
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    mainCategoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Main Category is Required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
SubCategorySchema.index({ name: 1 }, { unique: true });

// Pre-save hook to validate mainCategoryId
SubCategorySchema.pre("save", function (next) {
  const object = this;
  asyncHandler(async function () {
    const category = await CategoryModel.exists({ _id: object.mainCategoryId });
    if (!category) {
      // If the category does not exist, throw an error
      return next(
        new ApiError(
          `Category with ID ${object.mainCategoryId} not found`,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const subCategory = await SubCategoryModel.exists({
      name: object.name,
    });
    if (subCategory) {
      // If the sub Category already Exists .
      return next(
        new ApiError(
          `Sub Category with the name ${object.name} is already created`,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    // If the category exists, proceed to save the document
    next();
  }).call(this, next); // Bind `this` and pass `next`
});

export default SubCategorySchema;
