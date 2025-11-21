import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: [""],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => res.send("Server is running for authantication"));

app.use("/api/user", userRouter);
export default app;
