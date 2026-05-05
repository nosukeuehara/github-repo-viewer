import "server-only";

import {getRepositories} from "@/infra/gateway/getRepositories";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";
import {RepositoryPagination} from "../Pagenation/PagenationPresentation";

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
      {query && (
        <div className="space-y-2 mb-1">
          <h2 className="text-lg font-semibold">{`検索結果 ： "${query}"`}</h2>
          <p className="text-sm text-muted-foreground">
            約 {totalCount.toLocaleString()} 件中 {(page - 1) * perPage + 1} -{" "}
            {Math.min(page * perPage, totalCount)} 件を表示
          </p>
        </div>
      )}

      <RepositoryListPresentation
        query={query}
        repositories={repositories}
        className="mb-10"
      />

      {query && (
        <RepositoryPagination
          query={query}
          currentPage={page}
          totalCount={totalCount}
          perPage={15}
        />
      )}
    </div>
  );
}
