import express, { Response } from "express";
import AuthController from "../controller/auth-controller";
import { verifyRefreshToken, verifyToken } from "../middleware/auth-middleware";

const authRoutes = express.Router();

authRoutes.post("/login", AuthController.loginUser);
authRoutes.get("/check", verifyToken, AuthController.checkAuth);
authRoutes.post("/logout", verifyToken, AuthController.logoutUser);
authRoutes.get("/refresh-token", verifyRefreshToken, AuthController.refreshToken);

export default authRoutes;
