import {Skeleton} from "@/shared/shadcn/components/ui/skeleton";
import {RepositorySearchResultListSkeleton} from "./RepositorySearchResultList";

export function RepositorySearchPageSkeleton() {
  return (
    <div>
      <div className="flex gap-2 h-8 mb-4">
        <Skeleton className="h-full flex-1 rounded-xs" />
        <Skeleton className="h-full w-[20%] rounded-xs" />
      </div>

      <RepositorySearchResultListSkeleton />
    </div>
  );
}
