export type AppErrorCode =
  | "NOT_FOUND"
  | "RATE_LIMIT"
  | "BAD_REQUEST"
  | "SERVICE_UNAVAILABLE"
  | "UNKNOWN";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: AppErrorCode
  ) {
    super(message);

    this.name = "AppError";
  }
}
