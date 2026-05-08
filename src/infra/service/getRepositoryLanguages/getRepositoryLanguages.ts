import {repositoryLanguagesSchema} from "@/infra/service/schemas";
import {fetchLanguages} from "@/infra/api/githubApiClient";
import {parseApiResponse} from "@/infra/parsers/parseApiResponse";

export async function getRepositoryLanguages(owner: string, repo: string) {
  const data = await fetchLanguages(owner, repo);

  return parseApiResponse(repositoryLanguagesSchema, data);
}
