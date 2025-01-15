import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import slugify from "slugify";
import mongoose from "mongoose";
import CategoryModel from "../model/category.model.js";
import ApiError from "../../../utils/api.error.js";
import ApiFeatuers from "../../../utils/api.featuers.js";

//          @desc                    Create Category
//          @route                   POST  /create-category
//          @access                  private

export const createCategory = expressAsyncHandler(async (req, res) => {
  console.log("iam here");
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
  const apiFeatures = new ApiFeatuers(CategoryModel.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .search()
    .paginate(await CategoryModel.estimatedDocumentCount());
  const { mongooseQuery, paginationResult } = apiFeatures;

  const categories = await mongooseQuery;
  if (!categories) {
    next(new ApiError("Categories is Empty", StatusCodes.NO_CONTENT));
  }
  res.status(StatusCodes.OK).json({
    message: "Successfull",
    ...paginationResult,
    data: categories,
  });
});

//          @desc                    get specfic category  by Name ;
//          @route                   GET /get-category
//          @access                  public

//          @desc                    get specfic category by ID  ;
//          @route                   GET /get-category
//          @access                  public

export const getCategory = expressAsyncHandler(async (req, res, next) => {
  const { name, id } = req.query;
  let category = null;
  if (id) {
    category = await getCategoryHelperFunction(
      "_id",
      new mongoose.Types.ObjectId(id)
    );
  } else if (name) {
    category = await getCategoryHelperFunction("name", name);
  }
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
  const { id } = req.params;

  const deletedCategory = await CategoryModel.findByIdAndDelete({ _id: id });
  console.log("this is the deleted category : ", deletedCategory);
  if (deletedCategory) {
    res.status(StatusCodes.OK).json({
      message: "Categoy Found and was Deleted",
      data: deletedCategory,
    });
  }
  // handles if the category id is not found ;
  return next(new ApiError("Category is not found", StatusCodes.NOT_FOUND));
});

/// HELPER FUNCTIONS :

export const getCategoryHelperFunction = async (searchTerm, value) => {
  let category = await CategoryModel.aggregate([
    {
      $match: { [searchTerm]: value }, // Use 'new' keyword
    },
    {
      $lookup: {
        from: "subcategories", // Collection name for SubCategoryModel
        localField: "_id",
        foreignField: "mainCategoryId",
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
  // category = CategoryModel.find({})
  return category;
};
