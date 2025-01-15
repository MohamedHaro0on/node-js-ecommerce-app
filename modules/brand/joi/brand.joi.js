import Joi from "joi";
import joiObjectId from "joi-objectid";
const objectId = joiObjectId(Joi); // Initialize joi-objectid
export const createBrandSchema = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(20).messages({
        "string.base": "Brand Name must be a string",
        "string.empty": "Brand Name is required",
        "string.min": "Brand Name must be at least 3 characters long",
        "string.max": "Brand Name must not exceed 20 characters",
        "any.required": "Brand Name is required",
      }),
      image: Joi.string(),
    }),
};

export const editBrandSchema = {
  body: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Brand ID must be a string",
        "string.empty": "Brand ID is required",
        "any.required": "Brand ID is required",
        "string.pattern.name": "Brand ID must be a valid MongoDB ObjectId",
      }),
      image: Joi.string(),
      name: Joi.string().required().min(3).max(20).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 20 characters",
        "any.required": "Name is required",
      }),
    }),
};

export const deleteBrandSchema = {
  params: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Brand ID must be a string",
        "string.empty": "Brand ID is required",
        "any.required": "Brand ID is required",
        "string.pattern.name": "Brand ID must be a valid MongoDB ObjectId",
      }),
    }),
};
export const getBrandSchema = {
  query: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Brand ID must be a string",
        "string.empty": "Brand ID is required",
        "any.required": "Brand ID is required",
        "string.pattern.name": "Brand ID must be a valid MongoDB ObjectId",
      }),
      name: Joi.string().min(3).max(20).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 20 characters",
      }),
      sort: Joi.string()
        .optional()
        .pattern(/^(-?((name|id)),?)+$/)
        .messages({
          "string.base": "Sort must be a string",
          "string.empty": "Sort is required",
          "string.pattern.base":
            "Sort must contain valid fields: Name , id Use '-' for descending order.",
        }),
      keyword: Joi.string().min(1).max(30).messages({
        "string.base": "key word must be a string",
        "string.empty": "key word is required",
        "string.min": "key word must be at least 10 characters long",
        "string.max": "description must not exceed 500 characters",
        "any.required": "key word is required",
      }),
      page: Joi.number().min(0).messages({
        "number.base": "Page must be a number",
        "number.empty": "Page is required",
        "number.min": "Page must be more than or equal to zero",
        "any.required": "Page is required",
      }),
      limit: Joi.number().min(0).messages({
        "number.base": "Limit  must be a number",
        "number.empty": "Limit  is required",
        "number.min": "Limit  must be more than or equal to zero",
        "any.required": "Limit  is required",
      }),
    }),
};
