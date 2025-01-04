import express from "express";
import EmployeeController from "../controller/employee-controller";

const employeeRoute = express.Router();
employeeRoute.post("/", EmployeeController.CreateEmployee);
employeeRoute.get("/", EmployeeController.GetAllEmployees)

export default employeeRoute;
