import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import SubCategoryModel from "../model/subCategory.model.js";
import slugify from "slugify";
import ApiError from "../../../utils/api.error.js";

//          @desc                    get  subcategories ;
//          @route                   get /subcategories/
//          @access                  public
export const getSubCategories = asyncHandler(async (req, res) => {
  const subcategories = await SubCategoryModel.find({})
    .skip(req.skip)
    .limit(req.limit);
  res.status(StatusCodes.OK).json({
    message: "Sub Categories Fetched Successfully",
    data: subcategories,
  });
});
//          @desc                    get  subcategories ;
//          @route                   get /subcategories/
//          @access                  public
export const getSubCategotyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findOne({ _id: id }).populate(
    "mainCategoryId"
  );
  res.status(StatusCodes.OK).json({
    message: "Sub Category Fetched Successfully",
    data: subCategory,
  });
});

//          @desc                    Create a subcategory ;
//          @route                   Post /subcategories/create
//          @access                  private

export const createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, mainCategoryId } = req.body;
  const newSubCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name),
    mainCategoryId,
  });
  if (newSubCategory) {
    res.status(StatusCodes.CREATED).json({
      message: "Sub Category is Created Successfully",
      data: newSubCategory,
    });
  }

  return next(
    new ApiError("Couldn't Find the Category", StatusCodes.NO_CONTENT)
  );
});

//          @desc                    edit specfic category  by Name ;
//          @route                   edit /subcategories/edit
//          @access                  private
export const editSubCategory = asyncHandler(async (req, res, next) => {
  const { name, subCategoryId, categoryId } = req;
  const newSubCategory = await SubCategoryModel.findByIdAndUpdate(
    { _id: subCategoryId },
    {
      name,
      slug: slugify(name),
      mainCategoryId: categoryId,
    }
  );
  if (newSubCategory) {
    res.status(StatusCodes.CREATED).json({
      message: "Sub Category is Created Edited Successfully",
      data: newSubCategory,
    });
  }
  return next(
    new ApiError("Couldn't Find the Category", StatusCodes.NO_CONTENT)
  );
});

//          @desc                    delete  subcategory ;
//          @route                   delete /delete-subcategory
//          @access                  private
export const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({
    message: "Sub Category is deleted ",
    data: deletedSubCategory,
  });
});
