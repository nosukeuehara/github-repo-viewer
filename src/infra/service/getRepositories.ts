import {fetchGitHubRepositories} from "../api/githubApiClient";
import {parseApiResponse} from "@/infra/parsers/parseApiResponse";
import {PER_PAGE} from "@/feature/githubRepository/constants";
import {repositorySchema} from "@/feature/githubRepository/schemas";

export async function getRepositories(
  query?: string,
  page = 1,
  perPage = PER_PAGE
) {
  if (!query) {
    return {
      repositories: [],
      totalCount: 0,
    };
  }

  const data = await fetchGitHubRepositories(query, page, perPage);

  return {
    repositories: data.items.map((repo) =>
      parseApiResponse(
        repositorySchema,
        repo,
        "Repository search response is invalid"
      )
    ),
    totalCount: data.total_count,
  };
}
