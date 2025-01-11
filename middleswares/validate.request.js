import { StatusCodes } from "http-status-codes";

const validateRequest = (schema) => {
  return async (req, res, next) => {
    const validationOptions = { abortEarly: false }; // Validate all fields, not just the first error
    try {
      // Validate body, params, and query if they exist in the schema
      const validationResults = {
        body:
          schema.body &&
          (await schema.body.validateAsync(req.body, validationOptions)),
        params:
          schema.params &&
          (await schema.params.validateAsync(req.params, validationOptions)),
        query:
          schema.query &&
          (await schema.query.validateAsync(req.query, validationOptions)),
      };

      // Check for validation errors
      const errors = [];
      if (validationResults.body && validationResults.body.error)
        errors.push(...validationResults.body.error.details);
      if (validationResults.params && validationResults.params.error)
        errors.push(...validationResults.params.error.details);
      if (validationResults.query && validationResults.query.error)
        errors.push(...validationResults.query.error.details);

      console.log("this is the errors :: ", errors);
      // If there are validation errors, send a 400 Bad Request response
      if (errors.length > 0) {
        const errorMessages = errors.map((detail) => detail.message).join(", ");
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `${errorMessages}`,
        });
      }
      // If validation passes, proceed to the next middleware or controller
      next();
    } catch (error) {
      // If there are validation errors, send a 400 Bad Request response
      if (error.details) {
        const errorMessages = error.details
          .map((detail) => detail.message)
          .join(", ");
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `${errorMessages}`,
        });
      }

      // Handle unexpected errors
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };
};

export default validateRequest;

// import { StatusCodes } from "http-status-codes";

// const validateRequest = (schema) => {
//   return async (req, res, next) => {
//     const validationOptions = { abortEarly: false }; // Validate all fields, not just the first error

//     try {
//       // Validate body, params, and query if they exist in the schema
//       const validationResults = {
//         body:
//           schema.body &&
//           (await schema.body.validateAsync(req.body, validationOptions)),
//         params:
//           schema.params &&
//           (await schema.params.validateAsync(req.params, validationOptions)),
//         query:
//           schema.query &&
//           (await schema.query.validateAsync(req.query, validationOptions)),
//       };

//       console.log("Validation results:", validationResults);

//       // If validation passes, proceed to the next middleware or controller
//       next();
//     } catch (error) {
//       console.log("Validation error:", error);

//       // If there are validation errors, send a 400 Bad Request response
//       if (error.details) {
//         const errorMessages = error.details
//           .map((detail) => detail.message)
//           .join(", ");
//         return res.status(StatusCodes.BAD_REQUEST).json({
//           message: `${errorMessages}`,
//         });
//       }

//       // Handle unexpected errors
//       return res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ message: "Internal server error" });
//     }
//   };
// };

// export default validateRequest;
