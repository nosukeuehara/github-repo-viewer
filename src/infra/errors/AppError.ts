import {AppErrorMessage} from "./errorMessages";

export const APP_ERROR_CODE = {
  NOT_FOUND: "NOT_FOUND",
  RATE_LIMIT: "RATE_LIMIT",
  BAD_REQUEST: "BAD_REQUEST",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  UNKNOWN: "UNKNOWN",
} as const;

// AppErrorCode は APP_ERROR_CODE の値の union 型
export type AppErrorCode = (typeof APP_ERROR_CODE)[keyof typeof APP_ERROR_CODE];

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: AppErrorMessage
  ) {
    super(message);
    this.name = "AppError";
  }
}
