import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";
import {getRepositoryLanguages} from "@/infra/service/getRepositoryLanguages/getRepositoryLanguages";
import {getRepositoryDetail} from "@/infra/service";
import {buildRepositoryStats} from "../../lib/buildRepositoryStats";
import {BackButton} from "@/shared/ui/BackButton";
import {handleError} from "@/shared/lib/handleError";

type Props = {
  owner: string;
  repo: string;
};

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
    <>
      <RepositoryDetailPresentation
        repo={repositoryDetail.data}
        languages={languages.data}
        stats={stats}
      />
      <div className="flex justify-center mt-6">
        <BackButton />
      </div>
    </>
  );
}
