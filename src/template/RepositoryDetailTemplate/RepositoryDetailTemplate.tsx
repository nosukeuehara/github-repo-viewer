import "server-only";
import {RepositoryDetailContainer} from "@/feature/githubRepository/components/RepositoryDetail/RepositoryDetailContainer";
import {BackButton} from "@/shared/ui/BackButton";
import {Suspense} from "react";
import {RepositoryDetailSkeleton} from "@/shared/ui/RepositoryDetailSkeleton";

type Props = {
  owner: string;
  repo: string;
};

function RepositoryDetailTemplate({owner, repo}: Props) {
  return (
    <div>
      <RepositoryDetailContainer owner={owner} repo={repo} />

      <div className="flex justify-center mt-6">
        <BackButton />
      </div>
    </div>
  );
}

export {RepositoryDetailTemplate as RepositoryDetail};
