import { NextFunction, Response } from "express";
import { UserRequest } from "../model/auth";
import ResponseError from "../model/error-response";

const verifyRole = (allowedRoles: string[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole) {
      throw new ResponseError(403, "Role not found in payload");
    }

    if (!allowedRoles.includes(userRole)) {
      throw new ResponseError(403, "Access denied");
    }

    next();
  };
};

export default verifyRole;
