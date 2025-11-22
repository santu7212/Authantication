import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateJWT=function(){
  return jwt.sign(
    {id:this._id,
      email:this.email
    },
    process.env.JWT_SECRET,
    {expiresIn:"7d"}

  )
}

const User = mongoose.model("User", userSchema);

export default User;
