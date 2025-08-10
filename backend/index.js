import mongoose from "mongoose";
import express from "express";
import { app, server } from "./socket.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import authRouter from "./routes/auth.route.js";
import msgRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";
import { authMiddleware } from "./util/middleware.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e.message));

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", authMiddleware, msgRouter);
app.use("/api/v1/user", authMiddleware, userRouter);

server.listen(8080, () => console.log("server is running"));
