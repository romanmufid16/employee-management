import express, { Response } from "express";
import AuthController from "../controller/auth-controller";

const authRoutes = express.Router();

authRoutes.post("/login", AuthController.LoginUser);

export default authRoutes;
