import { Router } from "express";
import {
  login,
  getUser,
  getAllUsers,
  register,
  checkTwoFaCode,
} from "../controller/user.controller.js";
import verfiyToken from "../../../middleswares/verfiy.token.js";
import validateRequest from "../../../middleswares/validate.request.js";
import {
  loginSchema,
  createUserSchema,
  // verifyEmailSchema,
  // twoFaCodeSchema,
} from "../joi/user.validation.js";
import checkIfExists from "../../../middleswares/check.if.exists.js";
import UserModel from "../model/user.model.js";

const userRoutes = Router();

// LOGGING
userRoutes.post("/login", validateRequest(loginSchema), login);
userRoutes.post(
  "/add-user",
  validateRequest(createUserSchema),
  checkIfExists(UserModel, "email", "email", false),
  register
);
userRoutes.post(
  "/two-fa-check",
  // validateRequest(twoFaCodeSchema),
  verfiyToken,
  checkTwoFaCode
);

// READ
userRoutes.get("/users", verfiyToken, getAllUsers);
userRoutes.get("/user/:id", verfiyToken, getUser);

export default userRoutes;
