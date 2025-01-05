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
      // name: Joi.string().min(3).max(20).messages({
      //   "string.base": "Name must be a string",
      //   "string.empty": "Name is required",
      //   "string.min": "Name must be at least 3 characters long",
      //   "string.max": "Name must not exceed 20 characters",
      // }),
    }),
};
