import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT;

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://authanticationsantu0.vercel.app",
//     ],
//     credentials: true,
//   }),
// );
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://authantication-rtw6.vercel.app",
//   "https://authantication-phi.vercel.app"
// ];
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.includes("vercel.app") ||
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

app.options("*", cors());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
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
