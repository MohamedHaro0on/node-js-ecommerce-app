import { StatusCodes } from "http-status-codes";
import ApiError from "../api.error.js";
import expressAsyncHandler from "express-async-handler";

const createHandler = (Model) =>
  expressAsyncHandler(async (req, res, next, error) => {
    const createdDocument = await Model.create(req.body);

    if (createdDocument) {
      return res.status(StatusCodes.OK).json({
        message: `${Model.modelName} Created Succefully successfully`,
      });
    }

    // If no ${Model.modelName} was found to update
    return next(
      new ApiError(
        `${Model.modelName} not found or could not be updated.`,
        StatusCodes.NOT_FOUND
      )
    );
  });

export default createHandler;
