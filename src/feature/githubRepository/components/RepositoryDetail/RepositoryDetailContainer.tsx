import {notFound} from "next/navigation";
import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";
import {getRepositoryLanguages} from "@/infra/service/getRepositoryLanguages/getRepositoryLanguages";
import {getRepositoryDetail} from "@/infra/service";
import {buildRepositoryStats} from "../../lib/buildRepositoryStats";
import {APP_ERROR_CODE} from "@/infra/errors/AppError";
import {getErrorViewModelByCode} from "@/infra/errors/getErrorViewModal";
import {ErrorView} from "@/shared/ui/ErrorView";
import {APP_ERROR_MESSAGE} from "@/infra/errors/errorMessages";
import {AppHandledError} from "@/infra/errors/handledError";

type Props = {
  owner: string;
  repo: string;
};

function handleError(error: AppHandledError): never | React.ReactElement {
  if (error.code === APP_ERROR_CODE.NOT_FOUND) {
    notFound();
  }

  if (error.code === APP_ERROR_CODE.UNKNOWN) {
    throw new Error(APP_ERROR_MESSAGE.UNKNOWN);
  }

  return <ErrorView errorView={getErrorViewModelByCode(error.code)} />;
}

export async function RepositoryDetailContainer({owner, repo}: Props) {
  const [repositoryDetail, languages] = await Promise.all([
    getRepositoryDetail(owner, repo),
    getRepositoryLanguages(owner, repo),
  ]);

  if (!repositoryDetail.ok) {
    return handleError(repositoryDetail.error);
  }

  if (!languages.ok) {
    return handleError(languages.error);
  }

  const stats = buildRepositoryStats(repositoryDetail.data);
  return (
    <RepositoryDetailPresentation
      repo={repositoryDetail.data}
      languages={languages.data}
      stats={stats}
    />
  );
}
