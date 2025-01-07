import { Employee } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface TokenPayload {
  employeeId: string;
  role: string;
}

const generateAccessToken = (user: Employee) => {
  const payload: TokenPayload = {
    employeeId: user.employeeId,
    role: user.role,
  };
  return jwt.sign(payload, process.env.ACCESS_SECRET!, { expiresIn: "1d" });
};

const generateRefreshToken = (user: Employee) => {
  const payload: TokenPayload = {
    employeeId: user.employeeId,
    role: user.role,
  };
  return jwt.sign(payload, process.env.REFRESH_SECRET!, { expiresIn: "7d" });
}


export { generateAccessToken, generateRefreshToken };
