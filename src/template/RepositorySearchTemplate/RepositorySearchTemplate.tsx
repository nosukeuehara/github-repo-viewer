import "server-only";
import {RepositorySearchResultListContainer} from "@/feature/githubRepository/components/RepositorySearchResultList/RepositorySearchResultListContainer";
import {Suspense} from "react";
import {RepositorySearchFormContainer} from "@/feature/githubRepository/components/RepositorySearchFrom/RepositorySearchFormContainer";

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
      {/* TODO : Loading用の画面を作成 */}
      <Suspense key={`${param ?? ""}-${page}`} fallback={<p>Loading...</p>}>
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
