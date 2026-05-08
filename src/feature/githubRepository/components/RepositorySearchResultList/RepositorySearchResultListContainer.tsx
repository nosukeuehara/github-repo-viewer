import {AppPagination} from "@/shared/ui/AppPagination";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";
import {getRepositories} from "@/infra/service";
import {buildRepositoryPagination} from "./lib/buildRepositoryPagination";

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
  const {repositories, totalCount} = await getRepositories(
    query,
    page,
    perPage
  );

  return (
    <div>
      <RepositoryListPresentation
        query={query}
        repositories={repositories}
        className="mb-10"
        totalCount={totalCount}
        page={page}
        perPage={perPage}
      />
      {query && (
        <AppPagination
          currentPage={page}
          {...buildRepositoryPagination({
            query,
            currentPage: page,
            totalCount,
            perPage,
          })}
        />
      )}
    </div>
  );
}
