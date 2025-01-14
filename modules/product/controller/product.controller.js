import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import slugify from "slugify";
import ProductModel from "../model/product.model.js";
import ApiError from "../../../utils/api.error.js";

const removeAttr = "-createdAt -updatedAt -__v";
const getFullInfo = [
  { path: "brand", select: removeAttr }, // Populate the brand field
  { path: "category", select: removeAttr }, // Populate the category field
  { path: "subCategories", select: removeAttr }, // Populate the subCategories array
];
//          @desc                    Create Product
//          @route                   POST  /create-product
//          @access                  private
export const createProduct = expressAsyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  const newProduct = await ProductModel.create(req.body);
  if (newProduct)
    res.status(StatusCodes.CREATED).json({
      message: "Success",
      data: newProduct,
    });
  else
    return next(
      new ApiError(
        "Can't Create a new Product ",
        StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE
      )
    );
});

//          @desc                    Get Products
//          @route                   GET   /get-products
//          @access                      public

export const getProducts = expressAsyncHandler(async (req, res, next) => {
  // Base query
  let mongooseQuery = ProductModel.find(req.filter)
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .populate(getFullInfo);

  // Fields Linting
  if (req.query.fields) {
    // If fields are specified:
    const fields = req.query.fields
      .split(",")
      .map((field) => field.trim()) // Trim whitespace
      .filter((field) => field) // Remove empty strings
      .concat([" _id", "category", "subCategories"]) // Always include these fields
      .join(" "); // Join into a single string

    console.log("Selected fields:", fields);
    mongooseQuery = mongooseQuery.select(fields); // Correct usage
  } else {
    // If no fields are specified, exclude unwanted fields
    mongooseQuery = mongooseQuery.select(removeAttr);
  }

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort
      .split(",")
      .map((field) => field.trim()) // Trim whitespace
      .filter((field) => field) // Remove empty strings
      .join(" "); // Join into a single string

    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    // Default sorting (if needed)
    mongooseQuery = mongooseQuery.sort("createdAt");
  }

  // Execute the query
  const products = await mongooseQuery.lean(); // Use .lean() for better performance

  if (products) {
    res.status(StatusCodes.OK).json({
      message: "Successful",
      limit: req.pagination.limit,
      currentPage: req.pagination.page,
      totalCount: req.pagination.totalCount,
      totalPages: req.pagination.totalPages,
      total: products.length,
      data: products,
    });
  } else {
    next(
      new ApiError("There are no products to display", StatusCodes.NO_CONTENT)
    );
  }
});

//          @desc                    get specfic Product by ID  ;
//          @route                   GET /get-product
//          @access                  public
export const getProductById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.query;
  let product = await ProductModel.findById(id)
    .populate(getFullInfo)
    .select(removeAttr);
  //if Product was not found :
  if (product) {
    res.status(StatusCodes.OK).json({
      message: "Successfll",
      data: product,
    });
  }
  //if Product is not found :
  return next(new ApiError("Product is not found", StatusCodes.NOT_FOUND));
});

//          @desc                    get  Products  by Name ;
//          @route                   GET /get-product
//          @access                  public
export const getProductsByName = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.query;
  let products = await ProductModel.find({ name })
    .populate(getFullInfo)
    .select(removeAttr);
  //if Product was not found :
  if (products && products.length > 0) {
    res.status(StatusCodes.OK).json({
      message: "Successfull",
      limit: req.pagination.limit,
      currentPage: req.pagination.page,
      totalCount: req.pagination.totalCount,
      totalPages: req.pagination.totalPages,
      data: products,
      total: products.length,
    });
  } else {
    //if Product is not found :
    return next(
      new ApiError(
        `There are no products with name : ${name}`,
        StatusCodes.NOT_FOUND
      )
    );
  }
});

//          @desc                        Update specfic Product
//          @route                       PUT         /update-product
//          @access                      Private

export const updateProduct = expressAsyncHandler(async (req, res, next) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.name);
  }
  const { id } = req.query;

  const product = await ProductModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  })
    .populate(getFullInfo)
    .select(removeAttr);
  if (product) {
    res.status(StatusCodes.ACCEPTED).json({
      message: "Succesfull",
      data: product,
    });
  } else {
    // handles if the Product id is not found ;
    return next(new ApiError("Product is not found", StatusCodes.NOT_FOUND));
  }
});

//          @desc                        Delete specfic Product
//          @route                       Delete         /update-product
//          @access                      Private

export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.query;

  const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id });
  if (deletedProduct) {
    res.status(StatusCodes.OK).json({
      message: "Product Found and was Deleted",
      data: deletedProduct,
    });
  } else {
    // handles if the Product id is not found ;
    return next(new ApiError("Product is not found", StatusCodes.NOT_FOUND));
  }
});

// UTILITY FUNCTIONS :::::
// APPLY FILTERS :

export const applyFilter = expressAsyncHandler(async (req, res, next) => {
  // the list of the exculded parameters ;
  const excludedParameters = ["limit", "size", "page", "sort", "fields"];
  // Making a deep copy of the req.query object ;
  let queryObject = { ...req.query };
  console.log("this is the query object : ", queryObject);
  // exculded the un-needed parameters from going to the query ;
  excludedParameters.forEach((element) => delete queryObject[element]);

  // stringfiying the queryObject ;
  let query = JSON.stringify(queryObject);
  console.log("this is the query : ", query);

  // Searching for ( greater than ) || (greater than or equal ) || (less than ) || (less than or equal ) ;
  // to put a dollar sign before them
  // to execute the query ;
  query = query.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // Parsing the Query String to pass to the mongoose engine ;
  query = JSON.parse(query);

  req.filter = query;
  next();
});
