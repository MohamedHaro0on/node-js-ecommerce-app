import { isValidObjectId } from "mongoose";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import SubCategoryModel from "../model/subCategory.model.js";
import slugify from "slugify";

//          @desc                    Create a subcategory ;
//          @route                   Post /create-subcategory
//          @access                  private

export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, categoryId } = req;
  if (isValidObjectId(categoryId)) {
    const newSubCategory = await SubCategoryModel.create({
      name,
      slug: slugify(name),
    });
    if (newSubCategory) {
      res.status(StatusCodes.CREATED).send({
        message: "Sub Category is Created Successfully",
        data: newSubCategory,
      });
    }
  }

  return 0;
});

//          @desc                    edit specfic category  by Name ;
//          @route                   edit /get-subcategory
//          @access                  private
export const editSubCategory = asyncHandler(async (req, res) => {
  const { name, slug, categoryId } = req;
  if (isValidObjectId(categoryId)) {
    const newSubCategory = await SubCategoryModel.create({
      name,
      slug: slugify(name),
    });
    if (newSubCategory) {
      res.status(StatusCodes.CREATED).send({
        message: "Sub Category is Created Successfully",
        data: newSubCategory,
      });
    }
  }

  return 0;
});
