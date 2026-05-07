import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/shared/shadcn/components/ui/pagination";
import {cn} from "@/shared/lib/utils";

const pageLinkClass =
  "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors";

export function AppPagination({
  currentPage,
  hasPreviousPage,
  hasNextPage,
  previousHref,
  nextHref,
  shouldShow,
}: {
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  previousHref: string;
  nextHref: string;
  shouldShow: boolean;
}) {
  if (!shouldShow) return null;

  return (
    <Pagination>
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <Link href={previousHref} className={pageLinkClass}>
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

        {hasNextPage && (
          <PaginationItem>
            <Link href={nextHref} className={pageLinkClass}>
              Next
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
