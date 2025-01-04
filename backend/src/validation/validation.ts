import { ZodType } from "zod";

class ValidationHandler {
  static validate<T>(schema: ZodType, data: T): T {
    return schema.parse(data);
  }
}

export default ValidationHandler;
