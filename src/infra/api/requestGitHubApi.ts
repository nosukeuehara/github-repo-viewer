import {APP_ERROR_CODE} from "../errors/AppError";
import {APP_ERROR_MESSAGE} from "../errors/errorMessages";
import {AppHandledError} from "../errors/handledError";
import {Result} from "../service/types/result";

const GITHUB_API_BASE_URL = "https://api.github.com";

const ERROR_BY_STATUS = {
  404: {
    code: APP_ERROR_CODE.NOT_FOUND,
    message: APP_ERROR_MESSAGE.NOT_FOUND,
  },
  403: {
    code: APP_ERROR_CODE.RATE_LIMIT,
    message: APP_ERROR_MESSAGE.RATE_LIMIT,
  },
  422: {
    code: APP_ERROR_CODE.BAD_REQUEST,
    message: APP_ERROR_MESSAGE.BAD_REQUEST,
  },
  503: {
    code: APP_ERROR_CODE.SERVICE_UNAVAILABLE,
    message: APP_ERROR_MESSAGE.SERVICE_UNAVAILABLE,
  },
} as const;

export async function requestGitHubApi<T>(
  path: string
): Promise<Result<T, AppHandledError>> {
  const res = await fetch(`${GITHUB_API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    next: {revalidate: 60},
  });

  if (!res.ok) {
    const appError =
      ERROR_BY_STATUS[res.status as keyof typeof ERROR_BY_STATUS];

    if (appError) {
      return {
        ok: false,
        error: {code: appError.code},
      };
    }

    throw new Error(APP_ERROR_MESSAGE.UNKNOWN);
  }

  return {
    ok: true,
    data: (await res.json()) as T,
  };
}
