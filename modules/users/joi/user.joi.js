import Joi from "joi";
import checkIfEmailExists from "../../../utils/joi.external.functions/check.email.exists.js";

export const createUserSchema = {
  body: Joi.object()
    .required()
    .keys({
      firstName: Joi.string().required().min(3).max(20).messages({
        "string.base": "First Name must be a string",
        "string.empty": "First Name is required",
        "string.min": "First Name must be at least 3 characters long",
        "string.max": "First Name must not exceed 100 characters",
        "any.required": "First Name is required",
      }),
      lastName: Joi.string().required().min(3).max(20).messages({
        "string.base": "Last Name must be a string",
        "string.empty": "Last Name is required",
        "string.min": "Last Name must be at least 10 characters long",
        "string.max": "description must not exceed 500 characters",
        "any.required": "Last Name is required",
      }),
      email: Joi.string()
        .email()
        .required()
        .external(checkIfEmailExists)
        .messages({
          "string.base": "Email must be a string",
          "string.empty": "Email is required",
          "string.min": "Email must be at least 10 characters long",
          "any.required": "Email is required",
        }),
      age: Joi.number().required().min(10).messages({
        "number.base": "Age must be a number",
        "number.empty": "Age is required",
        "number.min": "Age must be more than or equal to ten",
        "number.required": "Age is required",
      }),
      password: Joi.string().required().min(8).messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be more than or equal to eight charchters",
      }),
    }),
};

export const verifyEmailSchema = {
  params: Joi.object()
    .required()
    .keys({
      email: Joi.string().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.min": "Email must be at least 10 characters long",
        "any.required": "Email is required",
      }),
    }),
};
