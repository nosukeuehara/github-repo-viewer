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
  if (!repositoryDetail.ok) {
    return <div>Error: {repositoryDetail.error?.code}</div>;
  }
  if (!languages.ok) {
    return <div>Error: {languages.error?.code}</div>;
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
