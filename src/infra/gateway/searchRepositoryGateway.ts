import {repositorySchema} from "@/feature/githubRepository/schemas/repositorySchema";
import {fetchGitHubRepositories} from "../githubApiClient";

export async function searchRepositories(query?: string) {
  if (!query) return [];

  const data = await fetchGitHubRepositories(query);

  const result = data.items.flatMap((repo) => {
    return repositorySchema.safeParse(repo);
  });

  if (result.some((r) => !r.success)) {
    throw new Error("Repository search response is invalid");
  }

  return result.map((r) => r.data);
}
