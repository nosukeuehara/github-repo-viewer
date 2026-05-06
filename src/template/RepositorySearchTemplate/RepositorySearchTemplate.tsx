import "server-only";

import {RepositorySearchResultListContainer} from "@/feature/githubRepository/components/RepositorySearchResultList/RepositorySearchResultListContainer";
import {Suspense} from "react";
import {RepositorySearchFormContainer} from "@/feature/githubRepository/components/RepositorySearchFrom/RepositorySearchFormContainer";
import RepositorySearchResultListSkeleton from "@/shared/ui/RepositorySearchResultList";
import {PagenationContainer} from "@/feature/githubRepository/components/Pagenation/PagenationContainer";
import {getRepositories} from "@/infra/gateway/getRepositories";
import {PER_PAGE} from "@/shared/lib/utils";

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
        <PagenationContainer
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
