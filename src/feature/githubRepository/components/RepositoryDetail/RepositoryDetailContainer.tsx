import "server-only";

import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";
import {getRepositoryLanguages} from "@/infra/service/getRepositoryLanguages";
import {buildRepositoryStats} from "@/shared/lib/utils";
import {getRepositoryDetail} from "@/infra/service/getRepositoryDetail";

type Props = {
  owner: string;
  repo: string;
};

export async function RepositoryDetailContainer({owner, repo}: Props) {
  await setTimeout(() => {}, 10000);
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
