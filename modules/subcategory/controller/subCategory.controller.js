import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import SubCategoryModel from "../model/subCategory.model.js";
import slugify from "slugify";
import ApiError from "../../../utils/api.error.js";
import ApiFeatuers from "../../../utils/api.featuers.js";

//          @desc                    get  subcategories ;
//          @route                   get /subcategories/
//          @access                  public
export const getSubCategories = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatuers(SubCategoryModel.find(), req.query)
    .filter()
    .search()
    .sort()
    .paginate(await SubCategoryModel.estimatedDocumentCount())
    .populate({ path: "mainCategoryId", select: "name -_id" });

  const { mongooseQuery, paginationResult } = apiFeatures;
  const subCategories = await mongooseQuery;
  res.status(StatusCodes.OK).json({
    message: "Sub Categories Fetched Successfully",
    ...paginationResult,
    data: subCategories,
  });
});
//          @desc                    get  subcategories ;
//          @route                   get /subcategories/
//          @access                  public
export const getSubCategotyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findOne({ _id: id })
    // .populate("mainCategoryId")
    .populate({ path: "mainCategoryId", select: "name -_id" });
  res.status(StatusCodes.OK).json({
    message: "Sub Category Fetched Successfully",
    data: subCategory,
  });
});

//          @desc                    Create a subcategory ;
//          @route                   Post /subcategories/create
//          @access                  private

export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, mainCategoryId } = req.body;
  // if the Main Category exists and the subCategory doesn't then finally create the sub category ;
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
});

//          @desc                    edit specfic category  by Name ;
//          @route                   edit /subcategories/edit
//          @access                  private
export const editSubCategory = asyncHandler(async (req, res, next) => {
  const { name, subCategoryId, categoryId } = req.body;
  // edit only if the sub category doesn't exist in the same category ;
  // Check if a subcategory with the same name already exists in the same main category
  const existingSubCategory = await SubCategoryModel.findOne({
    name,
    mainCategoryId: categoryId,
    _id: { $ne: subCategoryId }, // Exclude the current subcategory being edited
  });

  if (existingSubCategory) {
    return next(
      new ApiError(
        "A subcategory with this name already exists in the same main category.",
        StatusCodes.CONFLICT
      )
    );
  }

  // If no duplicate exists, proceed with the update
  const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
    subCategoryId,
    {
      name,
      slug: slugify(name),
      mainCategoryId: categoryId,
    },
    { new: true } // Return the updated document
  );

  if (updatedSubCategory) {
    return res.status(StatusCodes.OK).json({
      message: "Subcategory updated successfully",
      data: updatedSubCategory,
    });
  }

  // If no subcategory was found to update
  return next(
    new ApiError(
      "Subcategory not found or could not be updated.",
      StatusCodes.NOT_FOUND
    )
  );
});

//          @desc                    delete  subcategory ;
//          @route                   delete /delete-subcategory
//          @access                  private
export const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({
    message: "Sub Category is deleted ",
    data: deletedSubCategory,
  });
});
