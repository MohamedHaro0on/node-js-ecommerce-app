import { StatusCodes } from "http-status-codes";
import ApiError from "../api.error.js";
import ApiFeatures from "../api.featuers.js";
import expressAsyncHandler from "express-async-handler";

const GetHandler = (Model, object) =>
  expressAsyncHandler(async (req, res) => {
    let apiFeatures = new ApiFeatures(Model.find(), req.query)
      .filter()
      .search()
      .sort()
      .paginate(await Model.estimatedDocumentCount());
    if (object) {
      apiFeatures = apiFeatures.populate(object);
    }

    const { mongooseQuery, paginationResult } = apiFeatures;
    const data = await mongooseQuery;
    if (data) {
      res.status(StatusCodes.OK).json({
        message: ` ${Model.modelName} Fetched Successfully`,
        ...paginationResult,
        data: data,
      });
    } else {
      //if data is not found :
      return next(
        new ApiError(`${Model.modelName} is not found`, StatusCodes.NOT_FOUND)
      );
    }
  });

export default GetHandler;
