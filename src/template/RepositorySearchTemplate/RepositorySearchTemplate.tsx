import "server-only";
import {RepositorySearchResultListContainer} from "@/feature/githubRepository/components/RepositorySearchResultList/RepositorySearchResultListContainer";
import {Suspense} from "react";
import {RepositorySearchFormContainer} from "@/feature/githubRepository/components/RepositorySearchFrom/RepositorySearchFormContainer";
import RepositorySearchResultListSkeleton from "@/shared/ui/RepositorySearchResultList";

function RepositorySearchTemplate({
  param,
  page,
}: {
  param?: string;
  page: number;
}) {
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
          perPage={15}
        />
      </Suspense>
    </div>
  );
}

export {RepositorySearchTemplate as RepositorySearch};
