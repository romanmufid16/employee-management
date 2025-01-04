import { Employee } from "@prisma/client";

export type EmployeeResponse = {
  employeeId: string;
  username: string;
  name: string;
  position?: string;
  role: string;
  dateOfJoining: string;
  status: string;
}

export type CreateEmployee = {
  username: string;
  password: string;
  firstName: string;
  lastName?: string;
  position?: string;
  role: string;
  dateOfJoining: Date;
}

export type GetEmployeeById = {
  employeeId: string;
}

export const toEmployeResponse = (emp: Employee): EmployeeResponse => {
  const name = `${emp.firstName} ${emp.lastName ?? ''}`.trim();
  return {
    employeeId: emp.employeeId,
    username: emp.username,
    name,
    position: emp.position ?? '',
    role: emp.role,
    dateOfJoining: emp.dateOfJoining.toISOString().split('T')[0],
    status: emp.status,
  }
}