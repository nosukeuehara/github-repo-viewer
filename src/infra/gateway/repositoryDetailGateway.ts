import {repositoryDetailSchema} from "@/feature/githubRepository/schemas/repositoryDetailSchema";
import {fetchGitHubRepositoryDetail} from "../githubApiClient";

export async function githubRepositoryDetail(owner: string, repo: string) {
  const data = await fetchGitHubRepositoryDetail(owner, repo);

  console.log("Fetched repository detail:", data);

  const result = repositoryDetailSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Repository detail response is invalid");
  }

  return result.data;
}
