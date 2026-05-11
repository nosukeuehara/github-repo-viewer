import {AppPagination} from "@/shared/ui/AppPagination";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";
import {getRepositories} from "@/infra/service";
import {buildRepositoryPagination} from "../../lib/buildRepositoryPagination";
import {handleError} from "@/shared/lib/handleError";

interface Props {
  perPage: number;
  query?: string;
  page?: number;
}

export async function RepositorySearchResultListContainer({
  perPage,
  query,
  page = 1,
}: Props) {
  const result = await getRepositories(perPage, query, page);

  if (!result.ok) {
    return handleError(result.error);
  }

  return (
    <div>
      <RepositoryListPresentation
        query={query}
        repositories={result.data.repositories}
        className="mb-10"
        totalCount={result.data.totalCount}
        page={page}
        perPage={perPage}
      />
      {query && (
        <AppPagination
          currentPage={page}
          {...buildRepositoryPagination({
            query,
            currentPage: page,
            totalCount: result.data.totalCount,
            perPage,
          })}
        />
      )}
    </div>
  );
}
