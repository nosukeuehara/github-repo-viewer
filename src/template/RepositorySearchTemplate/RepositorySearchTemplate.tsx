import "server-only";
import {RepositorySearchFormPresentation} from "@/feature/githubRepository/components/RepositorySearchFrom";
import {RepositorySearchResultListContainer} from "@/feature/githubRepository/components/RepositorySearchResultList/RepositorySearchResultListContainer";
import {Suspense} from "react";

function RepositorySearchTemplate({
  param,
  page,
}: {
  param?: string;
  page: number;
}) {
  const query = param?.trim();

  return (
    <div>
      <RepositorySearchFormPresentation defaultQuery={query} className="mb-4" />
      {/* TODO : Loading用の画面を作成 */}
      <Suspense key={`${query ?? ""}-${page}`} fallback={<p>Loading...</p>}>
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
