import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import slugify from "slugify";
import mongoose from "mongoose";
import BrandModel from "../model/brand.model.js";
import ApiError from "../../../utils/api.error.js";
import ApiFeature from "../../../utils/api.featuers.js";

//          @desc                    Create Brand
//          @route                   POST  /create-brand
//          @access                  private

export const createBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const newBrand = await BrandModel.create({
    name,
    slug: slugify(name),
    // image ;
  });
  res.status(StatusCodes.CREATED).json({
    message: "Success",
    data: newBrand,
  });
});

//          @desc                    Get brands
//          @route                   GET   /get-brands
//          @access                      public

export const getBrands = expressAsyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeature(BrandModel.find(), req.query)
    .paginate(await BrandModel.estimatedDocumentCount())
    .filter()
    .search()
    .limitFields()
    .sort();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;
  if (!brands) {
    next(new ApiError("brands are Empty", StatusCodes.NO_CONTENT));
  }
  res.status(StatusCodes.OK).json({
    message: "Successfull",
    ...paginationResult,
    data: brands,
  });
});

//          @desc                    get specfic Brand  by Name ;
//          @route                   GET /get-Brand
//          @access                  public

//          @desc                    get specfic Brand by ID  ;
//          @route                   GET /get-Brand
//          @access                  public

export const getBrand = expressAsyncHandler(async (req, res, next) => {
  const { name, id } = req.query;
  let Brand = null;
  if (id) {
    Brand = await getBrandHelperFunction(
      "_id",
      new mongoose.Types.ObjectId(id)
    );
  } else if (name) {
    Brand = await getBrandHelperFunction("name", name);
  }
  //if Brand was not found :
  if (Brand) {
    res.status(StatusCodes.OK).json({
      message: "Successfll",
      data: Brand,
    });
  }
  //if Brand is not found :
  return next(new ApiError("Brand is not found", StatusCodes.NOT_FOUND));
});

//          @desc                        Update specfic Brand
//          @route                       PUT         /update-Brand
//          @access                      Private

export const updateBrand = expressAsyncHandler(async (req, res, next) => {
  const { name, id } = req.body;
  const Brand = await BrandModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (Brand) {
    res.status(StatusCodes.ACCEPTED).json({
      message: "Succesfull",
      data: Brand,
    });
  }
  // handles if the Brand id is not found ;
  return next(new ApiError("Brand is not found", StatusCodes.NOT_FOUND));
});

//          @desc                        Delete specfic Brand
//          @route                       Delete         /update-Brand
//          @access                      Private

export const deleteBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedBrand = await BrandModel.findByIdAndDelete({ _id: id });
  if (deletedBrand) {
    res.status(StatusCodes.OK).json({
      message: "Categoy Found and was Deleted",
      data: deletedBrand,
    });
  }
  // handles if the Brand id is not found ;
  return next(new ApiError("Brand is not found", StatusCodes.NOT_FOUND));
});

/// HELPER FUNCTIONS :

export const getBrandHelperFunction = async (searchTerm, value) => {
  let Brand = await BrandModel.aggregate([
    {
      $match: { [searchTerm]: value }, // Use 'new' keyword
    },
    {
      $lookup: {
        from: "subbrands", // Collection name for SubBrandModel
        localField: "_id",
        foreignField: "mainBrandId",
        as: "subbrands",
      },
    },
    {
      $project: {
        name: 1, // Include the Brand name
        subbrands: 1, // Include the populated sub-brands
      },
    },
  ]);
  // Brand = BrandModel.find({})
  return Brand;
};
