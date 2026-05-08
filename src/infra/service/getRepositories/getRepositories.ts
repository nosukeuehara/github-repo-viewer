import {fetchGitHubRepositories} from "@/infra/api/githubApiClient";
import {parseApiResponse} from "@/infra/parsers/parseApiResponse";
import {PER_PAGE} from "@/feature/githubRepository/constants";
import {repositorySearchResponseSchema} from "../schemas/repositorySearchResponseSchema";

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

  const parsedResponse = parseApiResponse(repositorySearchResponseSchema, data);

  return {
    repositories: parsedResponse.items,
    totalCount: parsedResponse.total_count,
  };
}
