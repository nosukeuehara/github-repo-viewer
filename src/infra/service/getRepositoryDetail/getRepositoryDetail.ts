import {repositoryDetailSchema} from "@/infra/service/schemas";
import {fetchGitHubRepositoryDetail} from "@/infra/api/githubApiClient";
import {parseApiResponse} from "@/infra/parsers/parseApiResponse";
import {RepositoryDetail} from "../schemas/types";
import {AppHandledError} from "@/infra/errors/handledError";

type GetRepositoryDetailResult =
  | {
      ok: true;
      data: RepositoryDetail;
    }
  | {
      ok: false;
      error: AppHandledError;
    };

export async function getRepositoryDetail(
  owner: string,
  repo: string
): Promise<GetRepositoryDetailResult> {
  const result = await fetchGitHubRepositoryDetail(owner, repo);

  if (!result.ok) {
    return {
      ok: false,
      error: result.error,
    };
  }

  return {
    ok: true,
    data: parseApiResponse(repositoryDetailSchema, result.data),
  };
}
