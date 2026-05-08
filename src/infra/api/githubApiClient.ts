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

  return requestGitHubApi(`/search/repositories?${params}`);
}

export async function fetchGitHubRepositoryDetail(owner: string, repo: string) {
  return requestGitHubApi(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
  );
}

export async function fetchLanguages(owner: string, repo: string) {
  return requestGitHubApi(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`
  );
}
