import express from "express";
import {
  getUserDetails,
  isAuthanticated,
  login,
  logOut,
  register,
  resetPassword,
  sendResetOTP,
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
userRouter.get("/is-auth", verifyJWT, isAuthanticated);
userRouter.post("/send-reset-otp", verifyJWT, sendResetOTP);
userRouter.post("/reset-password", verifyJWT, resetPassword);
userRouter.get("/get-user", verifyJWT, getUserDetails);

export default userRouter;
