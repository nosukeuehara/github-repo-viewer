import {Skeleton} from "@/shared/shadcn/components/ui/skeleton";

export default function RepositorySearchResultListSkeleton() {
  return (
    <div>
      <div className="space-y-2 mb-1">
        <Skeleton className="h-6 w-48 rounded-xs" />
        <Skeleton className="h-4 w-32 rounded-xs" />
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 15}).map((_, index) => (
          <li key={index}>
            <Skeleton className="h-24 w-full rounded-xs" />
          </li>
        ))}
      </ul>
    </div>
  );
}
