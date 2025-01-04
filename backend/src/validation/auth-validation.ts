import { z, ZodType } from "zod";

class AuthValidation {
  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
}

export default AuthValidation;