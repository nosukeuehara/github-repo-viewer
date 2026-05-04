import {repositoryLanguagesSchema} from "@/feature/githubRepository/schemas/repositoryLanguageSchema";
import {fetchLanguages} from "../githubApiClient";

export async function getRepositoryLanguages(owner: string, repo: string) {
  const data = await fetchLanguages(owner, repo);

  const result = repositoryLanguagesSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Repository languages response is invalid");
  }

  return result.data;
}
