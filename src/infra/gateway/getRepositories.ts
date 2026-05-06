import {ZodError} from "zod";
import {repositorySchema} from "@/feature/githubRepository/schemas/repositorySchema";
import {fetchGitHubRepositories} from "../githubApiClient";
import {PER_PAGE} from "@/shared/lib/utils";

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

  try {
    return {
      repositories: data.items.map((repo) => repositorySchema.parse(repo)),
      totalCount: data.total_count,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error("Repository search response is invalid");
    }

    throw error;
  }
}
