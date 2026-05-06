import {Skeleton} from "@/shared/shadcn/components/ui/skeleton";

export function RepositoryDetailSkeleton() {
  return (
    <section className="space-y-4">
      <div className="flex items-start gap-4">
        <Skeleton
          className="
            rounded-full border object-cover
            w-16 h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24"
        />

        <div className="space-y-2 flex-1">
          <Skeleton className="h-8" />
          <div className="flex gap-2">
            <Skeleton className="h-6 flex-1" />
            <Skeleton className="h-5 flex-1" />
            <Skeleton className="h-5 flex-1" />
          </div>
          {/* PC表示 */}
          <Skeleton className="hidden sm:block h-4 w-full max-w-md" />
        </div>
      </div>

      {/* スマホ表示 */}
      <Skeleton className="sm:hidden h-4 w-full max-w-md" />

      <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
        {Array.from({length: 4}).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="mx-auto h-4 w-16" />
            <Skeleton className="mx-auto h-4 w-10" />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    </section>
  );
}
