// step 1 cretae user

import User from "../models/user.model.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Fill the field for register" });
    }
    const existingUser = await User.findById({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User with this email already exist",
      });
    }
    // hash password
    const user = new User({ username, email, password });
    await user.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: { id, username, email },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
