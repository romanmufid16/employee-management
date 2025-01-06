import { prismaClient } from "../app/database";
import redisClient from "../app/redis";
import {
  CreateEmployee,
  EmployeeResponse,
  toEmployeResponse,
} from "../model/employee";
import ResponseError from "../model/error-response";
import generateEmployeeId from "../utils/generate-employeeId";
import EmployeeValidation from "../validation/employee-validation";
import ValidationHandler from "../validation/validation";
import bcrypt from "bcrypt";

class EmployeeService {
  static async create(req: CreateEmployee): Promise<EmployeeResponse> {
    const validatedRequest = ValidationHandler.validate(
      EmployeeValidation.CREATE,
      req
    );

    const checkUsername = await prismaClient.employee.findUnique({
      where: { username: validatedRequest.username },
    });

    if (checkUsername) {
      throw new ResponseError(400, "Username already exists");
    }

    const hashedPassword = await bcrypt.hash(validatedRequest.password, 10);
    const employeeId = generateEmployeeId();
    const data = {
      employeeId,
      username: validatedRequest.username,
      password: hashedPassword,
      firstName: validatedRequest.firstName,
      lastName: validatedRequest.lastName ?? null,
      position: validatedRequest.position ?? null,
      role: validatedRequest.role,
      dateOfJoining: validatedRequest.dateOfJoining,
    };

    const employee = await prismaClient.employee.create({
      data,
    });
    return toEmployeResponse(employee);
  }

  static async getAll(): Promise<EmployeeResponse[]> {
    const cachedEmployees = await redisClient.get("employees");
    if (cachedEmployees) {
      return JSON.parse(cachedEmployees);
    }

    const employees = await prismaClient.employee.findMany();
    const employeesResponse = employees.map(toEmployeResponse);

    await redisClient.set("employees", JSON.stringify(employeesResponse), {
      EX: 60,
    });

    return employeesResponse;
  }
}

export default EmployeeService;
