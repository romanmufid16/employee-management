import { z, ZodType } from "zod";

class EmployeeValidation {
  static readonly CREATE: ZodType = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    position: z.string().optional(),
    role: z.string().min(1, "Role is required"),
    dateOfJoining: z.string().min(1, "Date of joining is required"),
  });

  static readonly GETBYID: ZodType = z.object({
    employeeId: z.string().min(1, "Employee ID is required"),
  });
}

export default EmployeeValidation;
