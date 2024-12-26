import expressAsyncHandler from "express-async-handler";
import CategoryModel from "../model/category.model.js";
import { StatusCodes } from "http-status-codes";
import slugify from "slugify";
import { isValidObjectId } from "mongoose";
import ApiError from "../../../utils/api.error.js";

// @desc      Create Category
// @route     POST  /create-category
// @access    private

export const createCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const newCategory = await CategoryModel.create({
    name,
    slug: slugify(name),
    // image ;
  });
  res.status(StatusCodes.CREATED).json({
    message: "Success",
    newCategory,
  });
});

// @desc      Get Categories
// @route     GET   /get-categories
// @access        public

export const getCategories = expressAsyncHandler(async (req, res, next) => {
  const categories = await CategoryModel.find({})
    .skip(req.pagination.skip)
    .limit(req.pagination.limit);
  if (!categories) {
    next(new ApiError("Categories is Empty", StatusCodes.NO_CONTENT));
  }
  res.status(StatusCodes.ACCEPTED).json({
    message: "Successfull",
    page: req.pagination.page,
    limit: req.pagination.limit,
    categories,
  });
});

// @desc      get specfic category              GET Category by name and by id ;
// @route     GET /get-category
// @access    public

export const getCategory = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.query;
  let category = null;

  name ? (category = await CategoryModel.find({ name })) : null;

  id && isValidObjectId(id)
    ? (category = await CategoryModel.findOne({ _id: id }))
    : null;

  // if Category was found :
  if (category) {
    res.status(StatusCodes.OK).json({
      message: "Successfll",
      category,
    });
  }
  // if Category is not found :
  return next(new ApiError("Category is not found", StatusCodes.NOT_FOUND));
});

// @desc          Update specfic Category
// @route         PUT         /update-category
// @access        Private

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
      category,
    });
  }
  return next(new ApiError("Category is not found", StatusCodes.NOT_FOUND));
});

// @desc          Delete specfic Category
// @route         Delete         /update-category
// @access        Private

export const deleteCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.query;
  const deletedCategory =
    isValidObjectId(id) && (await CategoryModel.findByIdAndDelete({ _id: id }));
  if (deletedCategory) {
    res.status(StatusCodes.OK).json({
      message: "Categoy Found and was Deleted",
      deletedCategory,
    });
  }
  return next(new ApiError("Category is not found", StatusCodes.NOT_FOUND));
});
