import {repositoryLanguagesSchema} from "@/feature/githubRepository/schemas";
import {fetchLanguages} from "../api/githubApiClient";
import {parseApiResponse} from "../parsers/parseApiResponse";

export async function getRepositoryLanguages(owner: string, repo: string) {
  const data = await fetchLanguages(owner, repo);

  return parseApiResponse(
    repositoryLanguagesSchema,
    data,
    "Repository languages response is invalid"
  );
}
