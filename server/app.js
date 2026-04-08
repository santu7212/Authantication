import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT

app.use(
  cors({
    origin: ["http://localhost:5173", "https://authanticationsantu0.vercel.app/login",/\.vercel\.app$/],
    
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Server is running for authantication"));

app.use("/api/user", userRouter);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
export default app;
