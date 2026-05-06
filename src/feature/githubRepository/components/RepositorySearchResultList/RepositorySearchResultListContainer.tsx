import "server-only";

import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";
import {Repository} from "../../types";

interface Props {
  query?: string;
  page?: number;
  perPage: number;
  repositories: Repository[];
  totalCount: number;
}

export function RepositorySearchResultListContainer({
  query,
  page = 1,
  perPage,
  repositories,
  totalCount,
}: Props) {
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
    </div>
  );
}
