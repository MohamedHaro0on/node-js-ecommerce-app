import expressAsyncHandler from "express-async-handler";
import createHandler from "../../../utils/handlers/create.handler.js";
import deleteHandler from "../../../utils/handlers/delete.handler.js";
import GetByIdHandler from "../../../utils/handlers/get.by.id.handler.js";
import GetHandler from "../../../utils/handlers/get.handler.js";
import updateHandler from "../../../utils/handlers/update.handler.js";
import UserModel from "../model/user.model.js";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../utils/api.error.js";
import jwt from "jsonwebtoken";

//          @desc                    post  users ;
//          @route                   post /users/add-user
//          @access                  public
export const createUser = createHandler(UserModel);

//          @desc                    put  users ;
//          @route                   put /users/update-user
//          @access                  private
export const updateUser = updateHandler(UserModel);

//          @desc                    del  users ;
//          @route                   del /users/delete-user
//          @access                  private
export const deleteUser = deleteHandler(UserModel);

//          @desc                    get  users ;
//          @route                   get /users/get-users
//          @access                  private
export const getUsers = GetHandler(UserModel);

//          @desc                    get  specfic user ;
//          @route                   get /users/get-user/:id
//          @access                  public
export const getUserById = GetByIdHandler(UserModel);

export const verifyEmail = expressAsyncHandler(async (req, res, next) => {
  jwt.verify(req.params.email, process.env.SECRET_KEY, async (err, decoded) => {
    if (decoded) {
      const user = await UserModel.findOneAndUpdate(
        { email: decoded },
        { verifyEmail: true }
      );
      console.log("this is the user ", user, decoded);
      if (user) {
        res.status(StatusCodes.ACCEPTED).json({
          message: "Email Found and Verified",
        });
      } else {
        return next(
          new ApiError("Email Was Not Found", StatusCodes.BAD_REQUEST)
        );
      }
    } else {
      return next(
        new ApiError(`Email Was Not Found : ${err}`, StatusCodes.BAD_REQUEST)
      );
    }
  });
});
