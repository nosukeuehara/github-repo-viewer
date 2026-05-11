import {Suspense} from "react";
import {RepositorySearchFormContainer} from "@/feature/githubRepository/components/RepositorySearchForm";
import {RepositorySearchResultListContainer} from "@/feature/githubRepository/components/RepositorySearchResultList";
import {RepositorySearchResultListSkeleton} from "@/shared/ui/RepositorySearchResultList";
import {PER_PAGE} from "@/feature/githubRepository/constants";

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
          perPage={PER_PAGE}
          query={param}
          page={page}
        />
      </Suspense>
    </div>
  );
}

export {RepositorySearchTemplate as RepositorySearch};
