import {Skeleton} from "@/shared/shadcn/components/ui/skeleton";

export function RepositoryDetailSkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-start gap-4">
        <Skeleton className="h-[100px] w-[100px] rounded-full" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </div>

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
