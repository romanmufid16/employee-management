import { NextFunction, Request, Response } from "express";
import { LoginRequest } from "../model/auth";
import AuthService from "../service/auth-service";

class AuthController {
  static async LoginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data: LoginRequest = req.body;
      const result = await AuthService.Login(data);
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        path: "/"
      });
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
      });
      res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
