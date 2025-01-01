import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/api.error.js";
const checkIfExists = (Model, reqAttr, schemaAttr, shouldExist) => {
  return asyncHandler(async (req, res, next) => {
    const identifier =
      req.body[reqAttr] || req.params[reqAttr] || req.query[reqAttr];
    if (!identifier) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `${reqAttr} is required`,
      });
    }

    const exists = await Model.exists({
      [schemaAttr]: identifier, // if the attr is id so use compare it with _id .
    });

    if ((exists && shouldExist) || (!exists && !shouldExist))
      // if the element exists and it should exist . doesn't and doesn't need to exist
      return next();
    else if (exists && !shouldExist) {
      // Object exists but shouldn't ;
      return new ApiError(
        `${identifier} already exists ...........................`,
        StatusCodes.BAD_REQUEST
      );
    } else if (!exists && shouldExist) {
      // "Object does not exist but should";
      return new ApiError(
        `${identifier} is not found ...........................`,
        StatusCodes.BAD_REQUEST
      );
    }
  });
};

export default checkIfExists;
