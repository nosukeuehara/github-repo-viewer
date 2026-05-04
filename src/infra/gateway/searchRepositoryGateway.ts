import {ZodError} from "zod";
import {repositorySchema} from "@/feature/githubRepository/schemas/repositorySchema";
import {fetchGitHubRepositories} from "../githubApiClient";

export async function searchRepositories(query?: string) {
  if (!query) return [];

  const data = await fetchGitHubRepositories(query);

  try {
    return data.items.map((repo) => repositorySchema.parse(repo));
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error("Repository search response is invalid");
    }

    throw error;
  }
}
