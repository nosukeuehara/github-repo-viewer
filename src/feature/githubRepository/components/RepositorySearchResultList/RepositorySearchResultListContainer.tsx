import {AppPagination} from "@/shared/ui/AppPagination";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";
import {getRepositories} from "@/infra/service";
import {buildRepositoryPagination} from "../../lib/buildRepositoryPagination";
import {APP_ERROR_CODE} from "@/infra/errors/AppError";
import {getErrorViewModelByCode} from "@/infra/errors/getErrorViewModal";
import {ErrorView} from "@/shared/ui/ErrorView";
import {APP_ERROR_MESSAGE} from "@/infra/errors/errorMessages";
import {AppHandledError} from "@/infra/errors/handledError";

interface Props {
  query?: string;
  page?: number;
  perPage: number;
}

function handleError(error: AppHandledError): never | React.ReactElement {
  if (error.code === APP_ERROR_CODE.UNKNOWN) {
    throw new Error(APP_ERROR_MESSAGE.UNKNOWN);
  }

  return <ErrorView errorView={getErrorViewModelByCode(error.code)} />;
}

export async function RepositorySearchResultListContainer({
  query,
  page = 1,
  perPage,
}: Props) {
  const result = await getRepositories(query, page, perPage);

  if (!result.ok) {
    return handleError(result.error);
  }

  return (
    <div>
      <RepositoryListPresentation
        query={query}
        repositories={result.data.repositories}
        className="mb-10"
        totalCount={result.data.totalCount}
        page={page}
        perPage={perPage}
      />
      {query && (
        <AppPagination
          currentPage={page}
          {...buildRepositoryPagination({
            query,
            currentPage: page,
            totalCount: result.data.totalCount,
            perPage,
          })}
        />
      )}
    </div>
  );
}
