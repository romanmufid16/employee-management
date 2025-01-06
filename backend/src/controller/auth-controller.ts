import { NextFunction, Request, Response } from "express";
import { LoginRequest, UserRequest } from "../model/auth";
import AuthService from "../service/auth-service";

class AuthController {
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data: LoginRequest = req.body;
      const result = await AuthService.login(data);
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        path: "/",
      });
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });
      res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } catch (error) {
      next(error);
    }
  }

  static async checkAuth(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const employeeId = req.user!.employeeId;
      const result = await AuthService.checkAuth(employeeId);
      res.json({
        success: true,
        message: "Authenticated",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logoutUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const employeeId = req.user!.employeeId;
      await AuthService.logout(employeeId);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
