import { prismaClient } from "../app/database";
import logger from "../app/logging";
import redisClient from "../app/redis";
import { AuthResponse, LoginRequest, toAuthResponse } from "../model/auth";
import { EmployeeResponse, toEmployeResponse } from "../model/employee";
import ResponseError from "../model/error-response";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generate-token";
import AuthValidation from "../validation/auth-validation";
import ValidationHandler from "../validation/validation";
import bcrypt from "bcrypt";

class AuthService {
  static async login(req: LoginRequest): Promise<AuthResponse> {
    const loginRequest = ValidationHandler.validate(AuthValidation.LOGIN, req);
    const user = await prismaClient.employee.findUnique({
      where: { username: loginRequest.username },
    });

    if (!user) {
      throw new ResponseError(401, "Invalid Credentials");
    }

    const isValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isValid) {
      throw new ResponseError(401, "Invalid Credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return toAuthResponse(accessToken, refreshToken);
  }

  static async checkAuth(id: string): Promise<EmployeeResponse> {
    const employeeId = id;
    const cachedUser = await redisClient.get(`user:${employeeId}`);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const user = await prismaClient.employee.findUnique({
      where: { employeeId },
    });

    if (!user) {
      throw new ResponseError(401, "Unauthorized");
    }
    const response = toEmployeResponse(user);
    await redisClient.set(`user:${employeeId}`, JSON.stringify(response), {
      EX: 86400,
    });

    return response;
  }

  static async logout(id: string): Promise<void> {
    const employeeId = id;
    await redisClient.del(`user:${employeeId}`);
  }

  static async refreshToken(id: string): Promise<AuthResponse> {
    const employeeId = id;
    const cachedUser = await redisClient.get(`user:${employeeId}`);
    const user = cachedUser
      ? JSON.parse(cachedUser)
      : await prismaClient.employee.findUnique({ where: { employeeId } });
    if (!user) {
      throw new ResponseError(401, "Unauthorized");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return toAuthResponse(accessToken, refreshToken);
  }
}

export default AuthService;
