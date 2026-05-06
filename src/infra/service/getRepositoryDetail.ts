import {repositoryDetailSchema} from "@/feature/githubRepository/schemas/repositoryDetailSchema";
import {fetchGitHubRepositoryDetail} from "../api/githubApiClient";
import {parseApiResponse} from "../parsers/parseApiResponse";

export async function getRepositoryDetail(owner: string, repo: string) {
  const data = await fetchGitHubRepositoryDetail(owner, repo);

  return parseApiResponse(
    repositoryDetailSchema,
    data,
    "Repository detail response is invalid"
  );
}
