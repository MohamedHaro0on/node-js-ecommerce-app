import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import User from "../modules/user/model/user.model.js";
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res
    .sendStatus(StatusCodes.UNAUTHORIZED)
    .send({ message: "Unauthorized!" });
};

const verfiyToken = async (req, res, next) => {
  try {
    let token = req.headers && req.headers.authorization;
    if (!token) {
      // if the token does't exist ;
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "you are not authorized",
      });
    } else if (token.startsWith("Bearer ")) {
      // check wether the token starts with the word Bearer ;
      token = token.split(" ")[1];
      jwt.verify(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        async (err, decoded) => {
          if (err) {
            return catchError(err, res);
          }
          req.userId = decoded.id;
          req.user = await User.findById({ _id: decoded.id }).select(
            "-password"
          );
          next();
        }
      );
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "you are not authorized",
      });
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "internal server error " + e,
      error: e,
    });
  }
};
export default verfiyToken;
