import express from "express";
import {
  isAuthanticated,
  login,
  logOut,
  register,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logOut);
userRouter.post("/send-otp", verifyJWT, sendVerifyOtp);
userRouter.post("/verify-email", verifyJWT, verifyEmail);
userRouter.post("/is-auth", verifyJWT, isAuthanticated);

export default userRouter;
