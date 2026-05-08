import {AppPagination} from "@/shared/ui/AppPagination";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";
import {getRepositories} from "@/infra/service";
import {buildRepositoryPagination} from "../../lib/buildRepositoryPagination";

interface Props {
  query?: string;
  page?: number;
  perPage: number;
}

export async function RepositorySearchResultListContainer({
  query,
  page = 1,
  perPage,
}: Props) {
  const result = await getRepositories(query, page, perPage);

  if (!result.ok) {
    return <div>Error: {result.error?.code}</div>;
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
