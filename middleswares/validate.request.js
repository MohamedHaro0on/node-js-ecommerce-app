import { StatusCodes } from "http-status-codes";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const validationOptions = { abortEarly: false }; // Validate all fields, not just the first error

    // Validate body, params, and query if they exist in the schema
    const validationResults = {
      body: schema.body && schema.body.validate(req.body, validationOptions),
      params:
        schema.params && schema.params.validate(req.params, validationOptions),
      query:
        schema.query && schema.query.validate(req.query, validationOptions),
    };

    // Check for validation errors
    const errors = [];
    if (validationResults.body && validationResults.body.error)
      errors.push(...validationResults.body.error.details);
    if (validationResults.params && validationResults.params.error)
      errors.push(...validationResults.params.error.details);
    if (validationResults.query && validationResults.query.error)
      errors.push(...validationResults.query.error.details);

    // If there are validation errors, send a 400 Bad Request response
    if (errors.length > 0) {
      const errorMessages = errors.map((detail) => detail.message).join(", ");
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `${errorMessages}`,
      });
    }

    // If validation passes, proceed to the next middleware or controller
    next();
  };
};

export default validateRequest;
