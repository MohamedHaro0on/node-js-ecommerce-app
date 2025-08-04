import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { StatusCodes } from "http-status-codes";
import { totp } from "speakeasy";
import { createToken } from "../../refresh_token/controller/refresh_token.controller.js";
import config from "../../../configurations/auth.config.js";
import createHandler from "../../../utils/handlers/create.handler.js";
import UserModel from "../model/user.model.js";
// REGISTER USER ;
export const register = createHandler(UserModel);

// USER LOGIN :
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email doesn't exist",
      });
    } else {
      const isMatch = await bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const accessToken = jwt.sign(
          { id: user._id },
          process.env.SECRET_ACCESS_TOKEN,
          { expiresIn: config.jwtExpiration }
        );
        const refreshToken = await createToken(user);
        if (refreshToken) {
          user.password = undefined;
          delete user.password;
          res
            .status(StatusCodes.OK)
            .cookie("refreshToken ", refreshToken, {
              httpOnly: true,
              maxAge: config.jwtRefreshExpiration,
              domain: process.env.DOMAIN,
            })
            .json({
              message: "Logged in Successfully",
              token: accessToken,
              refreshToken: refreshToken,
              data: user,
            });
        } else {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `can't generate Refresh token`,
          });
        }
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "wrong password",
        });
      }
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `can't login ...... ${e}`,
    });
  }
};

export const checkTwoFaCode = async (req, res) => {
  try {
    const { twoFaCode } = req.body;
    const { user } = req;
    if (user) {
      const isValid = totp.verify({
        secret: user.secret.ascii,
        encoding: "ascii",
        token: twoFaCode,
      });
      if (isValid) {
        res.status(StatusCodes.OK).json({
          message: "Log in Succesfull",
          valid: isValid,
        });
      } else {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
          message: "wrong Two Fa Code ",
          valid: isValid,
        });
      }
    } else {
      res.status(StatusCodes.FORBIDDEN).json({
        message: "User is not found",
      });
    }
  } catch (error) {
    console.log("this is the error ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "internal server error ",
      error: error,
    });
  }
};
// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(StatusCodes.OK).json({
      message: "All users Fetched successfully ",
      data: users,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `can't login ...... ${e}`,
    });
  }
};

// GET USER
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select("-password");
    res.status(StatusCodes.OK).json({
      message: "user found",
      data: user,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `can't login ...... ${e}`,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `can't login ...... ${e}`,
    });
  }
};
