import {z} from "zod";
import {APP_ERROR_MESSAGE} from "../errors/errorMessages";
import {APP_ERROR_CODE, AppError} from "../errors/AppError";

export function parseApiResponse<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new AppError(APP_ERROR_CODE.UNKNOWN, APP_ERROR_MESSAGE.UNKNOWN);
  }

  return result.data;
}
