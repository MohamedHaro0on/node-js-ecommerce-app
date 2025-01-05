import Joi from "joi";
import joiObjectId from "joi-objectid";
const objectId = joiObjectId(Joi); // Initialize joi-objectid

export const createProductSchema = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(30).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 30 characters",
        "any.required": "Name is required",
      }),
      description: Joi.string().required().min(10).max(100).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 10 characters long",
        "string.max": "Name must not exceed 100 characters",
        "any.required": "Name is required",
      }),
      price: Joi.number().required().min(0).messages({
        "number.base": "Price must be a number",
        "number.empty": "Price is required",
        "number.min": "Price must be more than or equal to zero",
        "any.required": "Price is required",
      }),
      quantity: Joi.number().required().min(0).max(1000).messages({
        "number.base": "Quantity must be a number",
        "number.empty": "Quantity is required",
        "number.min": "Quantity must be more than or equal to zero",
        "number.max": "Quantity must be less than 1000 item",
        "any.required": "Quantity is required",
      }),
      soldCount: Joi.number().min(0).messages({
        "number.base": "Sold Count must be a number",
        "number.empty": "Sold Count is required",
        "number.min": "Sold Count must be more than or equal to zero",
      }),
      ratingCount: Joi.number().min(0).messages({
        "number.base": "Rating Count must be a number",
        "number.empty": "Rating Count is required",
        "number.min": "Rating Count must be more than or equal to zero",
      }),
      ratingAverage: Joi.number().min(1).max(5).messages({
        "number.base": "Rating Average must be a number",
        "number.empty": "Rating Average is required",
        "number.min": "Rating Average must be more than or equal to one start",
        "number.max": "Rating Average must be less than 5 stars",
      }),

      imageCover: Joi.string().required().messages({
        "string.base": "Image Cover must be a string",
        "string.empty": "Image Cover is required",
        "any.required": "Image Cover is required",
      }),
      images: Joi.array().items(Joi.string()).messages({
        "array.base": "images must be a list",
        "array.items": "All images must be strings.",
      }),
      colorsList: Joi.array().items(Joi.string()).messages({
        "array.base": "images must be a list",
        "array.items": "All images must be strings.",
      }),
      discountRatio: Joi.number().min(0).max(100).messages({
        "number.base": "DiscountRatio must be a number",
        "number.empty": "DiscountRatio is required",
        "number.min": "DiscountRatio must be more than or equal to 0%",
        "number.max": "DiscountRatio must be less than 100% item",
      }),
      category: objectId().messages({
        "string.base": "Category ID must be a an object Id",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
      }),
      subCategory: objectId().messages({
        "string.base": "Sub Category ID must be a an object Id",
        "string.empty": "Sub Category ID is required",
        "string.pattern.name":
          "Sub Category ID must be a valid MongoDB ObjectId",
      }),
      brand: objectId().messages({
        "string.base": "Brand ID must be a an object Id",
        "string.empty": "Brand ID is required",
        "any.required": "Brand ID is required",
        "string.pattern.name": "Brand ID must be a valid MongoDB ObjectId",
      }),
    }),
};

export const editProductSchema = {
  query: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Category ID must be a string",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
      }),
    }),
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(30).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 30 characters",
        "any.required": "Name is required",
      }),
      description: Joi.string().required().min(10).max(100).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 10 characters long",
        "string.max": "Name must not exceed 100 characters",
        "any.required": "Name is required",
      }),
      price: Joi.number().required().min(0).messages({
        "number.base": "Price must be a number",
        "number.empty": "Price is required",
        "number.min": "Price must be more than or equal to zero",
        "any.required": "Price is required",
      }),
      quantity: Joi.number().required().min(0).max(1000).messages({
        "number.base": "Quantity must be a number",
        "number.empty": "Quantity is required",
        "number.min": "Quantity must be more than or equal to zero",
        "number.max": "Quantity must be less than 1000 item",
        "any.required": "Quantity is required",
      }),
      soldCount: Joi.number().min(0).messages({
        "number.base": "Sold Count must be a number",
        "number.empty": "Sold Count is required",
        "number.min": "Sold Count must be more than or equal to zero",
      }),
      ratingCount: Joi.number().min(0).messages({
        "number.base": "Rating Count must be a number",
        "number.empty": "Rating Count is required",
        "number.min": "Rating Count must be more than or equal to zero",
      }),
      ratingAverage: Joi.number().min(1).max(5).messages({
        "number.base": "Rating Average must be a number",
        "number.empty": "Rating Average is required",
        "number.min": "Rating Average must be more than or equal to one start",
        "number.max": "Rating Average must be less than 5 stars",
      }),

      imageCover: Joi.string().required().messages({
        "string.base": "Image Cover must be a string",
        "string.empty": "Image Cover is required",
        "any.required": "Image Cover is required",
      }),
      images: Joi.array().items(Joi.string()).messages({
        "array.base": "images must be a list",
        "array.items": "All images must be strings.",
      }),
      colorsList: Joi.array().items(Joi.string()).messages({
        "array.base": "images must be a list",
        "array.items": "All images must be strings.",
      }),
      discountRatio: Joi.number().min(0).max(100).messages({
        "number.base": "DiscountRatio must be a number",
        "number.empty": "DiscountRatio is required",
        "number.min": "DiscountRatio must be more than or equal to 0%",
        "number.max": "DiscountRatio must be less than 100% item",
      }),
      category: objectId().messages({
        "string.base": "Category ID must be a an object Id",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
      }),
      subCategory: objectId().messages({
        "string.base": "Sub Category ID must be a an object Id",
        "string.empty": "Sub Category ID is required",
        "string.pattern.name":
          "Sub Category ID must be a valid MongoDB ObjectId",
      }),
      brand: objectId().messages({
        "string.base": "Brand ID must be a an object Id",
        "string.empty": "Brand ID is required",
        "any.required": "Brand ID is required",
        "string.pattern.name": "Brand ID must be a valid MongoDB ObjectId",
      }),
    }),
};

export const deleteProductSchema = {
  params: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Product ID must be a string",
        "string.empty": "Product ID is required",
        "any.required": "Product ID is required",
        "string.pattern.name": "Product ID must be a valid MongoDB ObjectId",
      }),
    }),
};

export const getProductByIdSchema = {
  query: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Product ID must be a string",
        "string.empty": "Product ID is required",
        "any.required": "Product ID is required",
        "string.pattern.name": "Product ID must be a valid MongoDB ObjectId",
      }),
    }),
};

export const getProductsByNameSchema = {
  query: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(30).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 30 characters",
      }),
    }),
};
