import Joi from "joi";

export const createCategorySchema = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(10),
      image: Joi.string(),
    }),
};

export const editCategorySchema = {
  body: Joi.object()
    .required()
    .keys({
      id: Joi.string().required(),
      image: Joi.string(),
      name: Joi.string().required().min(3).max(10),
    }),
};

export const deleteCategorySchema = {
  parms: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};
export const getCategorySchema = {
  parms: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};
