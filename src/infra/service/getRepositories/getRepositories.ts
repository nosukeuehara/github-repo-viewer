import {fetchGitHubRepositories} from "@/infra/api/githubApiClient";
import {parseApiResponse} from "@/infra/parsers/parseApiResponse";
import {repositorySearchResponseSchema} from "../schemas/repositorySearchResponseSchema";
import {Repository} from "../schemas/types";
import {AppHandledError} from "@/infra/errors/handledError";

type GetRepositoriesResult =
  | {
      ok: true;
      data: {
        repositories: Repository[];
        totalCount: number;
      };
    }
  | {
      ok: false;
      error: AppHandledError;
    };

export async function getRepositories(
  perPage: number,
  query?: string,
  page = 1
): Promise<GetRepositoriesResult> {
  if (!query) {
    return {
      ok: true,
      data: {
        repositories: [],
        totalCount: 0,
      },
    };
  }

  const result = await fetchGitHubRepositories(perPage, query, page);

  if (!result.ok) {
    return {
      ok: false,
      error: result.error,
    };
  }

  const parsed = parseApiResponse(repositorySearchResponseSchema, result.data);

  return {
    ok: true,
    data: {
      repositories: parsed.items,
      totalCount: parsed.total_count,
    },
  };
}
