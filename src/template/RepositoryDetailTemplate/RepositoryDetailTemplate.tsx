import {RepositoryDetailContainer} from "@/feature/githubRepository/components/RepositoryDetail";

type Props = {
  owner: string;
  repo: string;
};

function RepositoryDetailTemplate({owner, repo}: Props) {
  return <RepositoryDetailContainer owner={owner} repo={repo} />;
}

export {RepositoryDetailTemplate as RepositoryDetail};
