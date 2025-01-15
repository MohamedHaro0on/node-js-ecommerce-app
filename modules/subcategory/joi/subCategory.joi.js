import Joi from "joi";
import joiObjectId from "joi-objectid";
const objectId = joiObjectId(Joi); // Initialize joi-objectid

const fieldsAttribute = [
  "name",
  "slug",
  "_id",
  "mainCategoryId",
  "createdAt",
  "updatedAt",
  "__v",
];

export const createSubCategotySchema = {
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
      mainCategoryId: objectId().required().messages({
        "string.base": "Category ID must be a string",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
      }),
    }),
};

export const editSubCategorySchema = {
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
      categoryId: objectId().required().messages({
        "string.base": "Category ID must be a string",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
      }),
      subCategoryId: objectId().required().messages({
        "string.base": "Category ID must be a string",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
      }),
    }),
};

export const deleteSubCategotySchema = {
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

export const getSubCategotyByIdSchema = {
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

export const getSubCategotyByNameSchema = {
  params: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(20).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 20 characters",
        "any.required": "Name is required",
      }),
    }),
};
export const getSubCategoriesSchema = {
  query: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).max(20).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 20 characters",
        "any.required": "Name is required",
      }),
      fields: Joi.string()
        .optional()
        .pattern(new RegExp(`^((${fieldsAttribute.join("|")}),?)+$`)) // Dynamically create regex
        .messages({
          "string.base": "Sort must be a string",
          "string.empty": "Sort is required",
          "string.pattern.base": `fields must contain valid fields: ${fieldsAttribute.join(" ,")}) Use '-' for descending order.`,
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
