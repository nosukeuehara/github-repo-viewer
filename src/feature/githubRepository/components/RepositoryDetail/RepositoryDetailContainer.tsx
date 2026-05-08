import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";
import {getRepositoryLanguages} from "@/infra/service/getRepositoryLanguages/getRepositoryLanguages";
import {getRepositoryDetail} from "@/infra/service";
import {buildRepositoryStats} from "../../lib/buildRepositoryStats";

type Props = {
  owner: string;
  repo: string;
};

export async function RepositoryDetailContainer({owner, repo}: Props) {
  const [repositoryDetail, languages] = await Promise.all([
    getRepositoryDetail(owner, repo),
    getRepositoryLanguages(owner, repo),
  ]);
  const stats = buildRepositoryStats(repositoryDetail);
  return (
    <RepositoryDetailPresentation
      repo={repositoryDetail}
      languages={languages}
      stats={stats}
    />
  );
}
