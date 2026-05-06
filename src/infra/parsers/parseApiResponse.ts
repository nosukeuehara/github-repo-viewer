import {z} from "zod";

export function parseApiResponse<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  errorMessage = "API response is invalid"
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error(errorMessage);
  }

  return result.data;
}
