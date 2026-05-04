import {getRepositories} from "@/infra/gateway/getRepositories";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";
import {RepositoryPagination} from "../Pagenation/PagenationPresentation";

interface Props {
  query?: string;
  page?: number;
  perPage?: number;
}

export async function RepositorySearchResultListContainer({
  query,
  page = 1,
  perPage = 12,
}: Props) {
  const {repositories, totalCount} = await getRepositories(
    query,
    page,
    perPage
  );

  return (
    <div className="space-y-6">
      <RepositoryListPresentation query={query} repositories={repositories} />

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
