import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/shared/shadcn/components/ui/pagination";
import {cn} from "@/shared/lib/utils";

const pageLinkClass =
  "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors";

export function PaginationPresentation({
  currentPage,
  pagination,
}: {
  currentPage: number;
  pagination: {
    totalPages: number;
    encodedQuery: string;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    previousHref: string;
    nextHref: string;
    shouldShow: boolean;
  };
}) {
  if (!pagination.shouldShow) return null;

  return (
    <Pagination>
      <PaginationContent>
        {pagination.hasPreviousPage && (
          <PaginationItem>
            <Link href={pagination.previousHref} className={pageLinkClass}>
              Previous
            </Link>
          </PaginationItem>
        )}

        <PaginationItem>
          <span
            aria-current="page"
            className={cn(pageLinkClass, "text-accent-foreground")}
          >
            {currentPage}
          </span>
        </PaginationItem>

        {pagination.hasNextPage && (
          <PaginationItem>
            <Link href={pagination.nextHref} className={pageLinkClass}>
              Next
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
