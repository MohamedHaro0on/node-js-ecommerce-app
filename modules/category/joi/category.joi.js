import Joi from "joi";
import joiObjectId from "joi-objectid";
const objectId = joiObjectId(Joi); // Initialize joi-objectid
export const createCategorySchema = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(20).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 20 characters",
        "any.required": "Name is required",
      }),
      image: Joi.string(),
    }),
};

export const editCategorySchema = {
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

export const deleteCategorySchema = {
  params: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Category ID must be a string",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
      }),
    }),
};
export const getCategorySchema = {
  query: Joi.object()
    .required()
    .keys({
      id: objectId().messages({
        "string.base": "Category ID must be a an object Id",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
      }),
      name: Joi.string().min(3).max(20).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 20 characters",
      }),
    }),
};
