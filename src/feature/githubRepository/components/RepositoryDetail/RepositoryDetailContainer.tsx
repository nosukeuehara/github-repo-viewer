import {githubRepositoryDetail} from "@/infra/gateway/getRepositoryDetail";
import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";
import {getRepositoryLanguages} from "@/infra/gateway/getRepositoryLanguages";

type Props = {
  owner: string;
  repo: string;
};

export async function RepositoryDetailContainer({owner, repo}: Props) {
  const [repositoryDetail, languages] = await Promise.all([
    githubRepositoryDetail(owner, repo),
    getRepositoryLanguages(owner, repo),
  ]);
  return (
    <RepositoryDetailPresentation
      repo={repositoryDetail}
      languages={languages}
    />
  );
}
