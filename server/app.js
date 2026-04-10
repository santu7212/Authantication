import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT;

// ✅ SINGLE CORS CONFIG (correct)
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.includes("vercel.app") || // allow all vercel deployments
        origin === "http://localhost:5173"
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// ✅ handle preflight
app.options("*", cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/user", userRouter);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

export default app;