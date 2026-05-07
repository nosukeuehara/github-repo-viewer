import {AppError} from "../errors/AppError";
import {APP_ERROR_MESSAGE} from "../errors/errorMessages";

const GITHUB_API_BASE_URL = "https://api.github.com";

export async function requestGitHubApi<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    next: {revalidate: 60},
  });

  if (!res.ok) {
    // GitHub APIのHTTPステータスをアプリケーションエラーへ変換する
    // スローされたAppErrorはNext.jsのerror.tsxで表示される
    switch (res.status) {
      case 404:
        throw new AppError(APP_ERROR_MESSAGE.NOT_FOUND, 404, "NOT_FOUND");

      case 403:
        throw new AppError(APP_ERROR_MESSAGE.RATE_LIMIT, 403, "RATE_LIMIT");

      case 422:
        throw new AppError(APP_ERROR_MESSAGE.BAD_REQUEST, 422, "BAD_REQUEST");

      case 503:
        throw new AppError(
          APP_ERROR_MESSAGE.SERVICE_UNAVAILABLE,
          503,
          "SERVICE_UNAVAILABLE"
        );

      default:
        throw new AppError(APP_ERROR_MESSAGE.UNKNOWN, res.status, "UNKNOWN");
    }
  }

  return res.json() as Promise<T>;
}
