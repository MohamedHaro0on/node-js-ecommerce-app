import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  verifyEmail,
} from "../controller/user.controller.js";
import { createUserSchema, verifyEmailSchema } from "../joi/user.joi.js";
import validateRequest from "../../../middleswares/validate.request.js";
import sendEmail from "../../../middleswares/email/send.email.js";

const userRouter = Router();

userRouter.get("/get-users", getUsers);

userRouter.put("/update-user", updateUser);
userRouter.delete("/delete-user", deleteUser);
userRouter.post(
  "/add-user",
  validateRequest(createUserSchema),
  sendEmail,
  createUser
);
userRouter.post("/get-user/:id", getUserById);
userRouter.get(
  "/verify-email/:email",
  validateRequest(verifyEmailSchema),
  verifyEmail
);

export default userRouter;
