import "server-only";

import {githubRepositoryDetail} from "@/infra/gateway/getRepositoryDetail";
import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";
import {getRepositoryLanguages} from "@/infra/gateway/getRepositoryLanguages";
import {buildRepositoryStats} from "@/shared/lib/utils";

type Props = {
  owner: string;
  repo: string;
};

export async function RepositoryDetailContainer({owner, repo}: Props) {
  const [repositoryDetail, languages] = await Promise.all([
    githubRepositoryDetail(owner, repo),
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
