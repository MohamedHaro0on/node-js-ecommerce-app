import { StatusCodes } from "http-status-codes";

const validateRequest = (schema) => {
  return (err, { body }, res, next) => {
    const requestValidation = schema.body.validate(body);
    if (requestValidation.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `request is not valid ${requestValidation.error.details[0].message}`,
      });
    } else {
      next();
    }
  };
};
export default validateRequest;

/*

import { StatusCodes } from "http-status-codes";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const requestValidation = schema.body.validate(req.body);
    if (requestValidation.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Request is not valid: ${requestValidation.error.details[0].message}`,
      });
    } else {
      next();
    }
  };
};

export default validateRequest;


*/
