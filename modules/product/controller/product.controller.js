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
  const products = await ProductModel.find({})
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .populate(getFullInfo)
    .select(removeAttr);
  if (!products) {
    next(
      new ApiError("there are no products to display", StatusCodes.NO_CONTENT)
    );
  }
  res.status(StatusCodes.OK).json({
    message: "Successfull",
    page: req.pagination.page,
    limit: req.pagination.limit,
    data: products,
  });
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
      message: "Successfll",
      data: products,
    });
  }
  //if Product is not found :
  return next(
    new ApiError(
      `There are no products with name : ${name}`,
      StatusCodes.NOT_FOUND
    )
  );
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
  }
  // handles if the Product id is not found ;
  return next(new ApiError("Product is not found", StatusCodes.NOT_FOUND));
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
  }
  // handles if the Product id is not found ;
  return next(new ApiError("Product is not found", StatusCodes.NOT_FOUND));
});
