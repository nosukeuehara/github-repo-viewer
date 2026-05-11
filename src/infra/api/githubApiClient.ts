import {requestGitHubApi} from "./requestGitHubApi";
import {RepositoryDetail, RepositoryLanguages} from "../service/schemas/types";

type GitHubRepositorySearchResponse = {
  items: unknown[];
  total_count: number;
};

export async function fetchGitHubRepositories(
  perPage: number,
  query: string,
  page: number
) {
  const params = new URLSearchParams({
    q: `${query} in:name`,
    page: String(page),
    per_page: String(perPage),
  });

  return requestGitHubApi<GitHubRepositorySearchResponse>(
    `/search/repositories?${params}`
  );
}

export async function fetchGitHubRepositoryDetail(owner: string, repo: string) {
  return requestGitHubApi<RepositoryDetail>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
  );
}

export async function fetchLanguages(owner: string, repo: string) {
  return requestGitHubApi<RepositoryLanguages>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`
  );
}
