import { NextFunction,  Response } from "express";
import ResponseError from "../model/error-response";
import jwt from "jsonwebtoken";
import { UserRequest } from "../model/auth";
import { Employee } from "@prisma/client";

const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  // console.log("Token dari cookies:", token);
  if (!token) {
    throw new ResponseError(401, "Token is Missing");
  }

  try {
    // Verifikasi token dengan Promise
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as Employee;

    // Jika token valid, simpan data yang terdekode di dalam req.user
    req.user = decoded;
    next();
  } catch (err) {
    // Jika token tidak valid
    throw new ResponseError(403, "Invalid Token");
  }
};

export default verifyToken;
