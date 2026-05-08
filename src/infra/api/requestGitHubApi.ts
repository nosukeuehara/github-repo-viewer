import {APP_ERROR_CODE, AppError} from "../errors/AppError";
import {APP_ERROR_MESSAGE} from "../errors/errorMessages";

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

export async function requestGitHubApi(path: string): Promise<unknown> {
  const res = await fetch(`${GITHUB_API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    next: {revalidate: 60},
  });

  if (!res.ok) {
    const appError = ERROR_BY_STATUS[
      // typeof で ERROR_BY_STATUS の型を取得し
      // keyof でそのキー一覧の union 型を作成する
      // res.status をその union 型へアサーションすることで
      // ERROR_BY_STATUS のキーとして扱えるようにしている
      res.status as keyof typeof ERROR_BY_STATUS
    ] ?? {
      code: APP_ERROR_CODE.UNKNOWN,
      message: APP_ERROR_MESSAGE.UNKNOWN,
    };

    throw new AppError(appError.code, appError.message);
  }

  return res.json() as Promise<unknown>;
}
