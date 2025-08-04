import Joi from "joi";

export const refreshTokenSchema = {
  body: Joi.object().required().empty(),
};
