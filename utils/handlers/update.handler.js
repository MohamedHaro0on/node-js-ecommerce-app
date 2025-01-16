import { StatusCodes } from "http-status-codes";
import ApiError from "../api.error.js";
import expressAsyncHandler from "express-async-handler";

const updateHandler = (Model) =>
  expressAsyncHandler(async (req, res, next, error) => {
    const { id } = req.query;
    const updatedDocument = await Model.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true } // Return the updated document
    );

    if (updatedDocument) {
      return res.status(StatusCodes.OK).json({
        message: `${Model.modelName} updated successfully`,
        data: updatedDocument,
      });
    } else {
      // If no ${Model.modelName} was found to update
      return next(
        new ApiError(
          `${Model.modelName} not found or could not be updated.`,
          StatusCodes.NOT_FOUND
        )
      );
    }
  });

export default updateHandler;
