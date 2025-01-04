import express from "express";
import cors from "cors";
import errorMiddleware from "../middleware/error-middleware";
import employeeRoute from "../routes/employee-route";
import authRoutes from "../routes/auth-route";
import cookieParser from "cookie-parser";
import verifyToken from "../middleware/auth-middleware";

const web = express();

web.use(cookieParser());
web.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
web.use(express.json());

web.use("/api/employees", verifyToken, employeeRoute);
web.use("/api/auth", authRoutes);

web.use(errorMiddleware);

export default web;
