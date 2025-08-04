import { Router } from "express";
import {
  createToken,
  verifyExpiration,
  refreshToken,
} from "../controller/refresh_token.controller.js";
import validateRequest from "../../../midlleware/validateRequest.js";
import { refreshTokenSchema } from "../joi/refresh_token.validation.js";

const refreshTokenRoutes = Router();

refreshTokenRoutes.post(
  "/refresh-token",
  // validateRequest(refreshTokenSchema),
  refreshToken
);

export default refreshTokenRoutes;
