import {Suspense} from "react";
import {RepositorySearchFormContainer} from "@/feature/githubRepository/components/RepositorySearchFrom";
import {RepositorySearchResultListContainer} from "@/feature/githubRepository/components/RepositorySearchResultList";
import {PaginationContainer} from "@/feature/githubRepository/components/Pagination";
import {RepositorySearchResultListSkeleton} from "@/shared/ui/RepositorySearchResultList";
import {getRepositories} from "@/infra/service/getRepositories";
import {PER_PAGE} from "@/feature/githubRepository/constants";

async function RepositorySearchTemplate({
  param,
  page,
}: {
  param?: string;
  page: number;
}) {
  const {repositories, totalCount} = await getRepositories(
    param,
    page,
    PER_PAGE
  );
  return (
    <div>
      <RepositorySearchFormContainer query={param} className="mb-4" />
      <Suspense
        key={`${param ?? ""}-${page}`}
        fallback={<RepositorySearchResultListSkeleton />}
      >
        <RepositorySearchResultListContainer
          query={param}
          page={page}
          perPage={PER_PAGE}
          repositories={repositories}
          totalCount={totalCount}
        />
      </Suspense>
      {param && (
        <PaginationContainer
          query={param}
          currentPage={page}
          totalCount={totalCount}
          page={page}
          perPage={PER_PAGE}
        />
      )}
    </div>
  );
}

export {RepositorySearchTemplate as RepositorySearch};
