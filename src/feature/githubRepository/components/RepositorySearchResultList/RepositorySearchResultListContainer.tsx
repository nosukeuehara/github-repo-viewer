import "server-only";

import {getRepositories} from "@/infra/gateway/getRepositories";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";
import {PagenationContainer} from "../Pagenation/PagenationContainer";

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
        <PagenationContainer
          query={query}
          currentPage={page}
          totalCount={totalCount}
          page={page}
          perPage={15}
        />
      )}
    </div>
  );
}
