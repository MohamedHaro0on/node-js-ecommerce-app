import Joi from "joi";
import JoiObjectId from "joi-objectid";

export const createSubCategotySchema = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(20),
      categoryId: JoiObjectId().required(),
    }),
};

export const editSubCategotySchema = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(20),
      categoryId: JoiObjectId().required(),
      subCategoryId: JoiObjectId().required(),
    }),
};

export const deleteSubCategotySchema = {
  body: Joi.object().required().keys({
    Id: JoiObjectId().required(),
  }),
};

export const getSubCategotySchemaById = {
  param: Joi.object().required().keys({
    Id: JoiObjectId().required(),
  }),
};

export const getSubCategotySchemaByName = {
  param: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(20),
    }),
};
