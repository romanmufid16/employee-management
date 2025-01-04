import { NextFunction, Request, Response } from "express";
import { CreateEmployee, EmployeeResponse } from "../model/employee";
import EmployeeService from "../service/employee-service";
import { UserRequest } from "../model/auth";

class EmployeeController {
  static async CreateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateEmployee = req.body;
      const result = await EmployeeService.create(data);
      res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async GetAllEmployees(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await EmployeeService.getAll();
      res.json({
        success: true,
        message: "Employees retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default EmployeeController;
