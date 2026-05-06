import {AppError} from "../errors/AppError";

const GITHUB_API_BASE_URL = "https://api.github.com";

export async function requestGitHubApi<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    next: {revalidate: 60},
  });

  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new AppError("Repository not found", 404, "NOT_FOUND");

      case 403:
        throw new AppError("GitHub API rate limit exceeded", 403, "RATE_LIMIT");

      case 422:
        throw new AppError("Invalid search query", 422, "BAD_REQUEST");

      case 503:
        throw new AppError(
          "GitHub API is temporarily unavailable",
          503,
          "SERVICE_UNAVAILABLE"
        );

      default:
        throw new AppError(
          "Unexpected GitHub API error",
          res.status,
          "UNKNOWN"
        );
    }
  }

  return res.json() as Promise<T>;
}
