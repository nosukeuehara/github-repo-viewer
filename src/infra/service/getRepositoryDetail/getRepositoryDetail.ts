import {repositoryDetailSchema} from "@/infra/service/schemas";
import {fetchGitHubRepositoryDetail} from "@/infra/api/githubApiClient";
import {parseApiResponse} from "@/infra/parsers/parseApiResponse";

export async function getRepositoryDetail(owner: string, repo: string) {
  const data = await fetchGitHubRepositoryDetail(owner, repo);

  return parseApiResponse(repositoryDetailSchema, data);
}
