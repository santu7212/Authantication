import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpiresAt: {
      type: Number,
      default: 0,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    resteOtp: {
      type: String,
      default: "",
    },
    resteOtpExpiresAt: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
