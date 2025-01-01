import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import slugify from "slugify";
import mongoose from "mongoose";
import CategoryModel from "../model/category.model.js";
import ApiError from "../../../utils/api.error.js";

//          @desc                    Create Category
//          @route                   POST  /create-category
//          @access                  private

export const createCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const newCategory = await CategoryModel.create({
    name,
    slug: slugify(name),
    // image ;
  });
  res.status(StatusCodes.CREATED).json({
    message: "Success",
    data: newCategory,
  });
});

//          @desc                    Get Categories
//          @route                   GET   /get-categories
//          @access                      public

export const getCategories = expressAsyncHandler(async (req, res, next) => {
  const categories = await CategoryModel.find({})
    .skip(req.pagination.skip)
    .limit(req.pagination.limit);
  if (!categories) {
    next(new ApiError("Categories is Empty", StatusCodes.NO_CONTENT));
  }
  res.status(StatusCodes.OK).json({
    message: "Successfull",
    page: req.pagination.page,
    limit: req.pagination.limit,
    data: categories,
  });
});

//          @desc                    get specfic category  by Name ;
//          @route                   GET /get-category
//          @access                  public

export const getCategoryByName = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  let category = null;

  if (name) category = await CategoryModel.find({ name });

  //if Category was found :
  if (category) {
    res.status(StatusCodes.OK).json({
      message: "Successfll",
      data: category,
    });
  }
  //if Category is not found :
  return next(new ApiError("Category is not found", StatusCodes.NOT_FOUND));
});

//          @desc                    get specfic category by ID  ;
//          @route                   GET /get-category
//          @access                  public

export const getCategoryById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let category = await CategoryModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) }, // Use 'new' keyword
    },
    {
      $lookup: {
        from: "subcategories", // Collection name for SubCategoryModel
        localField: "_id",
        foreignField: "category",
        as: "subCategories",
      },
    },
    {
      $project: {
        name: 1, // Include the category name
        subCategories: 1, // Include the populated sub-categories
      },
    },
  ]);

  //if Category was not found :
  if (category) {
    res.status(StatusCodes.OK).json({
      message: "Successfll",
      data: category,
    });
  }
  //if Category is not found :
  return next(new ApiError("Category is not found", StatusCodes.NOT_FOUND));
});

//          @desc                        Update specfic Category
//          @route                       PUT         /update-category
//          @access                      Private

export const updateCategory = expressAsyncHandler(async (req, res, next) => {
  const { name, id } = req.body;
  const category = await CategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (category) {
    res.status(StatusCodes.ACCEPTED).json({
      message: "Succesfull",
      data: category,
    });
  }
  // handles if the category id is not found ;
  return next(new ApiError("Category is not found", StatusCodes.NOT_FOUND));
});

//          @desc                        Delete specfic Category
//          @route                       Delete         /update-category
//          @access                      Private

export const deleteCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.query;

  const deletedCategory = await CategoryModel.findByIdAndDelete(id);
  if (deletedCategory) {
    res.status(StatusCodes.OK).json({
      message: "Categoy Found and was Deleted",
      data: deletedCategory,
    });
  }
  // handles if the category id is not found ;
  return next(new ApiError("Category is not found", StatusCodes.NOT_FOUND));
});
