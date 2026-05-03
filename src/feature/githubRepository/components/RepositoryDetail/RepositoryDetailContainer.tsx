import {githubRepositoryDetail} from "@/infra/gateway/repositoryDetailGateway";
import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";

type Props = {
  owner: string;
  repo: string;
};

export async function RepositoryDetailContainer({owner, repo}: Props) {
  const repositoryDetail = await githubRepositoryDetail(owner, repo);
  return <RepositoryDetailPresentation {...repositoryDetail} />;
}
