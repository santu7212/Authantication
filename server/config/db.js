import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/Auth`);
    console.log("Database connected sucessfully");
  } catch (error) {
    console.log("Database connection failure!!!", error.message);
  }
};


export default connectDB