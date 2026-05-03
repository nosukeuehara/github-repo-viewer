import {RepositoryDetailContainer} from "@/feature/githubRepository/components/RepositoryDetail/RepositoryDetailContainer";
import {Suspense} from "react";

type Props = {
  owner: string;
  repo: string;
};

function RepositoryDetailTemplate({owner, repo}: Props) {
  return (
    <div>
      <Suspense key={owner + "/" + repo} fallback={<p>Loading...</p>}>
        <RepositoryDetailContainer owner={owner} repo={repo} />
      </Suspense>
    </div>
  );
}

export {RepositoryDetailTemplate as RepositoryDetail};
