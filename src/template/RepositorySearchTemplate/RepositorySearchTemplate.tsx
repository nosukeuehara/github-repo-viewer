import {RepositorySearchFormPresentation} from "@/feature/githubRepository/components/RepositorySearchFrom";
import {RepositorySearchResultListContainer} from "@/feature/githubRepository/components/RepositorySearchResultList/RepositorySearchResultListContainer";
import {Suspense} from "react";

function RepositorySearchTemplate({param}: {param?: string}) {
  const query = param?.trim();

  return (
    <div>
      <RepositorySearchFormPresentation defaultQuery={query} />
      {/* TODO : Loading用の画面を作成 */}
      <Suspense key={query} fallback={<p>Loading...</p>}>
        <RepositorySearchResultListContainer query={query} />
      </Suspense>
    </div>
  );
}

export {RepositorySearchTemplate as RepositorySearch};
