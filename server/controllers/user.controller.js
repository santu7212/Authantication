// step 1 cretae user
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import transporter from "../config/nodemailer.js";
import { json } from "express";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Fill the field for register" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User with this email already exist",
      });
    }
    // hash password
    const user = new User({ username, email, password });
    await user.save();

    const token = user.generateJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //  sending welcome email after register
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to SantuHub",
      text: `Welcome to SantuHub website
      . yor account has been registerd with
       this email id: ${email}`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // console.log("Enter email or password");
      return res
        .status(400)
        .json({ success: false, message: "Enter email or password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user with this email does not exist please register first",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect email or password" });
    }
    const token = user.generateJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      message: "Login successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Fail to login" });
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "User logout successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Fail to logout" });
  }
};

// send verify otp to the user email
const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id not found " });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(402)
        .json({ success: false, message: "user not found " });
    }
    if (user.isAccountVerified === true) {
      return res
        .status(400)
        .json({ success: false, message: "Your account is already vrified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    user.verifyOtp = otp;
    user.verifyOtpExpiresAt = String(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: " OTP Verifiaction",
      text: `Your Account verification otp is ${otp}`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "OTP is sent to your account successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Fail to send OTP" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "user id not found " });
    }

    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is not found " });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found " });
    }

    if (user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpiresAt > String(Date.now() + 24 * 60 * 60 * 1000)) {
      return res.status(400).json({
        success: false,
        message: "Your OTP has expired please generate new OTP",
      });
    }
    user.isAccountVerified = true;
    (user.verifyOtp = ""), (user.verifyOtpExpiresAt = 0), await user.save();
    return res.status(200).json({
      success: true,
      message: "Your account is verified successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Fail to verify email" });
  }
};

const isAuthanticated = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "You are authanticated" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "User is not authanticated" });
  }
};

const sendResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "This email is not registered" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    user.resetOtp = otp;
    user.resteOtpExpiresAt = Date.now() + 16 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "RSET PASSWORD",
      text: `Your one time password is   ${otp} for reseting yor account`,
    };
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "OTP is sent for reset your password" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not registered" });
    }
    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is not found" });
    }
    if (!newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide new password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (!user.resetOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP (EMPTY)",
      });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (user.resteOtpExpiresAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }
    (user.password = newPassword), (user.resetOtp = "");
    user.resteOtpExpiresAt = 0;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password Reset Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(userId);
    
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    return (
      res.status(200).
      json({
        success: true,
        userData: {
          name: user.username,
          isAccountVerified: user.isAccountVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        message: "User detail fetch successfully",
      })
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  register,
  login,
  logOut,
  sendVerifyOtp,
  verifyEmail,
  isAuthanticated,
  sendResetOTP,
  resetPassword,
  getUserDetails,
};
