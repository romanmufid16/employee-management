import { prismaClient } from "../app/database";
import { AuthResponse, LoginRequest, toAuthResponse } from "../model/auth";
import ResponseError from "../model/error-response";
import { generateAccessToken } from "../utils/generate-token";
import AuthValidation from "../validation/auth-validation";
import ValidationHandler from "../validation/validation";
import bcrypt from "bcrypt";

class AuthService {
  static async Login(req: LoginRequest): Promise<AuthResponse> {
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
    const refreshToken = generateAccessToken(user);
    return toAuthResponse(accessToken, refreshToken);
  }
}

export default AuthService;