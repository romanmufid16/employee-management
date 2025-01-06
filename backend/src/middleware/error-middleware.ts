import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ResponseError from "../model/error-response";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      errors: JSON.stringify(err),
    });
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({
      success: false,
      errors: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      errors: err.message,
    });
  }
};

export default errorMiddleware;
