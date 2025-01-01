import mongoose from "mongoose";
import CategoryModel from "../model/category.model.js";
import ApiError from "../../../utils/api.error.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      unique: [true, "Cateogry Must be unique"],
      // unique: true,
      minLength: [3, "Category Name is too Short"],
      maxLength: [20, "Category Name is too Long"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);
CategorySchema.index({ name: 1 }, { unique: true });

// Pre-save hook to validate mainCategoryId
CategorySchema.pre("save", function (next) {
  const object = this;
  asyncHandler(async function () {
    const category = await CategoryModel.exists({ name: object.name });
    if (category) {
      // If the category does not exist, throw an error
      return next(
        new ApiError(
          `Category with name ${object.name} is found`,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    // If the category exists, proceed to save the document
    next();
  }).call(this, next); // Bind `this` and pass `next`
});

export default CategorySchema;
