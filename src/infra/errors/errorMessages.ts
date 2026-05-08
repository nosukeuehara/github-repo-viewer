import {APP_ERROR_CODE, AppErrorCode} from "./AppError";

export const APP_ERROR_MESSAGE = {
  [APP_ERROR_CODE.NOT_FOUND]: "Repository not found",
  [APP_ERROR_CODE.RATE_LIMIT]: "GitHub API rate limit exceeded",
  [APP_ERROR_CODE.BAD_REQUEST]: "Invalid search query",
  [APP_ERROR_CODE.SERVICE_UNAVAILABLE]: "GitHub API is temporarily unavailable",
  [APP_ERROR_CODE.UNKNOWN]: "Unexpected GitHub API error",
} as const satisfies Record<AppErrorCode, string>;

// AppErrorMessage は APP_ERROR_MESSAGE の値の union 型
export type AppErrorMessage =
  (typeof APP_ERROR_MESSAGE)[keyof typeof APP_ERROR_MESSAGE];
