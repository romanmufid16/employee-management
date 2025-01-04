import { Employee } from "@prisma/client";
import { Request } from "express";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export function toAuthResponse(
  accessToken: string,
  refreshToken: string
): AuthResponse {
  return {
    accessToken,
    refreshToken,
  };
}

export interface UserRequest extends Request {
  user?: Employee;
}
