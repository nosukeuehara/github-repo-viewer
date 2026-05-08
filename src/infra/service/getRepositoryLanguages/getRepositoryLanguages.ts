import {repositoryLanguagesSchema} from "@/infra/service/schemas";
import {fetchLanguages} from "@/infra/api/githubApiClient";
import {parseApiResponse} from "@/infra/parsers/parseApiResponse";
import {RepositoryLanguages} from "../schemas/types";
import {AppHandledError} from "@/infra/errors/handledError";

type GetRepositoryLanguagesResult =
  | {
      ok: true;
      data: RepositoryLanguages;
    }
  | {
      ok: false;
      error: AppHandledError;
    };

export async function getRepositoryLanguages(
  owner: string,
  repo: string
): Promise<GetRepositoryLanguagesResult> {
  const result = await fetchLanguages(owner, repo);

  if (!result.ok) {
    return {
      ok: false,
      error: result.error,
    };
  }

  return {
    ok: true,
    data: parseApiResponse(repositoryLanguagesSchema, result.data),
  };
}
