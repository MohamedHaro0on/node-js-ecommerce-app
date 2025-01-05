import mongoose from "mongoose";
import BrandModel from "../model/brand.model.js";
import ApiError from "../../../utils/api.error.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand Name is required"],
      unique: [true, "Brand Must be unique"],
      unique: true,
      minLength: [3, "Brand Name is too Short"],
      maxLength: [20, "Brand Name is too Long"],
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
BrandSchema.index({ name: 1 }, { unique: true });

// Pre-save hook to validate mainBrandId
BrandSchema.pre("save", function (next) {
  const object = this;
  asyncHandler(async function () {
    const Brand = await BrandModel.exists({ name: object.name });
    if (Brand) {
      // If the Brand does not exist, throw an error
      return next(
        new ApiError(
          `Brand with name ${object.name} is found`,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    // If the Brand exists, proceed to save the document
    next();
  }).call(this, next); // Bind `this` and pass `next`
});

export default BrandSchema;
