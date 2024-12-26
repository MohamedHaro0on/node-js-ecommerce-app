import { StatusCodes } from "http-status-codes";

const validateRequest = (schema) => {
  return (err, { body }, res, next) => {
    console.log("this is the error ", err);
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
