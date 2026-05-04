import "server-only";
import {RepositoryDetailContainer} from "@/feature/githubRepository/components/RepositoryDetail/RepositoryDetailContainer";
import {BackButton} from "@/shared/ui/BackButton";
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

      <div className="flex justify-center mt-6">
        <BackButton />
      </div>
    </div>
  );
}

export {RepositoryDetailTemplate as RepositoryDetail};
