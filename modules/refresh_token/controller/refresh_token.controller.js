import RefreshToken from "../model/refresh_token.model.js";
import { v4 as uuidv4 } from "uuid";
import config from "../../../configurations/auth.config.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const createToken = async (user) => {
  try {
    let savedToken = await RefreshToken.findOne({ user: user._id });
    if (savedToken) {
      if (verifyExpiration(savedToken)) {
        await RefreshToken.deleteOne(savedToken._id);
      } else {
        return savedToken.token;
      }
    }

    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();

    let _object = new RefreshToken({
      token: _token,
      user: user._id,
      expiryDate: expiredAt.getTime(),
    });

    let refreshToken = await _object.save();

    return refreshToken.token;
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
  }
};

export const verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

export const refreshToken = async (req, res) => {
  console.log("this is the req ", req.cookies);
  try {
    const { refreshToken: requestToken } = req.cookies;
    if (requestToken == null) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Refresh Token is required!" });
    }
    let refreshToken = await RefreshToken.findOne({
      token: requestToken,
    }).populate("user", "userName email secret");
    if (!refreshToken) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Refresh token is not in database!" });
      return false;
    } else {
      if (verifyExpiration(refreshToken)) {
        // if the refresh token is expired ;
        RefreshToken.findByIdAndRemove(refreshToken._id, {
          useFindAndModify: false,
        }).exec();
        res.status(StatusCodes.FORBIDDEN).json({
          message:
            "Refresh token was expired. Please make a new signin request",
        });
        return false;
      } else {
        let newAccessToken = jwt.sign(
          { id: refreshToken.user._id },
          process.env.SECRET_ACCESS_TOKEN,
          {
            expiresIn: config.jwtExpiration,
          }
        );
        res
          .status(StatusCodes.OK)
          .cookie("refreshToken ", refreshToken, {
            httpOnly: true,
            maxAge: config.jwtRefreshExpiration,
            domain: process.env.DOMAIN,
          })
          .json({
            accessToken: newAccessToken,
            // refreshToken: refreshToken.token,
            user: refreshToken.user,
          });
        return true;
      }
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
    return false;
  }
};

export const logout = async (user) => {
  try {
    const { _id } = user;
    await RefreshToken.findOneAndDelete(
      { user: _id },
      {
        useFindAndModify: false,
      }
    ).exec();
    return true;
  } catch (error) {
    return error;
  }
};
