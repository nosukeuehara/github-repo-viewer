import {PER_PAGE} from "@/feature/githubRepository/constants";
import {requestGitHubApi} from "./requestGitHubApi";

export async function fetchGitHubRepositories(
  query: string,
  page: number,
  perPage = PER_PAGE
) {
  const params = new URLSearchParams({
    q: `${query} in:name`,
    page: String(page),
    per_page: String(perPage),
  });

  return requestGitHubApi<{
    items: unknown[];
    total_count: number;
  }>(`/search/repositories?${params}`);
}

export async function fetchGitHubRepositoryDetail(owner: string, repo: string) {
  return requestGitHubApi<unknown>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
  );
}

export async function fetchLanguages(owner: string, repo: string) {
  return requestGitHubApi<unknown>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`
  );
}
