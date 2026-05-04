import {githubRepositoryDetail} from "@/infra/gateway/repositoryDetailGateway";
import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";
import {githubRepositoryLanguages} from "@/infra/gateway/repositoryLanguagesGateway";

type Props = {
  owner: string;
  repo: string;
};

export async function RepositoryDetailContainer({owner, repo}: Props) {
  const [repositoryDetail, languages] = await Promise.all([
    githubRepositoryDetail(owner, repo),
    githubRepositoryLanguages(owner, repo),
  ]);
  return (
    <RepositoryDetailPresentation
      repo={repositoryDetail}
      languages={languages}
    />
  );
}
