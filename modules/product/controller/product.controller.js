import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import slugify from "slugify";
import ProductModel from "../model/product.model.js";
import ApiError from "../../../utils/api.error.js";
import ApiFeatuers from "../../../utils/api.featuers.js";
import deleteHandler from "../../../utils/handlers/delete.handler.js";
import GetByIdHandler from "../../../utils/handlers/get.by.id.handler.js";
import updateHandler from "../../../utils/handlers/update.handler.js";
import GetHandler from "../../../utils/handlers/get.handler.js";
import createHandler from "../../../utils/handlers/create.handler.js";

const removeAttr = "-createdAt -updatedAt -__v";
const getFullInfo = [
  { path: "brand", select: removeAttr }, // Populate the brand field
  { path: "category", select: removeAttr }, // Populate the category field
  { path: "subCategories", select: removeAttr }, // Populate the subCategories array
];
//          @desc                    Create Product
//          @route                   POST  /create-product
//          @access                  private
export const createProduct = createHandler(ProductModel);

//          @desc                    Get Products
//          @route                   GET   /get-products
//          @access                      public

export const getProducts = GetHandler(ProductModel, getFullInfo);

//          @desc                    get specfic Product by ID  ;
//          @route                   GET /get-product
//          @access                  public
//    .populate(getFullInfo)

export const getProductById = GetByIdHandler(ProductModel, getFullInfo);

//          @desc                        Update specfic Product
//          @route                       PUT         /update-product
//          @access                      Private

export const updateProduct = updateHandler(ProductModel);

//          @desc                        Delete specfic Product
//          @route                       Delete         /update-product
//          @access                      Private

export const deleteProduct = deleteHandler(ProductModel);
