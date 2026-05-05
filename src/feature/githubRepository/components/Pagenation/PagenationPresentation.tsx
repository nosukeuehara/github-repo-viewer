import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/shared/shadcn/components/ui/pagination";
import {cn} from "@/shared/lib/utils";

const pageLinkClass =
  "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground";

export function RepositoryPagination({
  query,
  currentPage,
  totalCount,
  perPage,
}: {
  query: string;
  currentPage: number;
  totalCount: number;
  perPage: number;
}) {
  const totalPages = Math.ceil(totalCount / perPage);
  const encodedQuery = encodeURIComponent(query);

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <Link
              href={`/search?q=${encodedQuery}&page=${currentPage - 1}`}
              className={pageLinkClass}
            >
              前へ
            </Link>
          </PaginationItem>
        )}

        <PaginationItem>
          <span
            aria-current="page"
            className={cn(pageLinkClass, "bg-accent text-accent-foreground")}
          >
            {currentPage}
          </span>
        </PaginationItem>

        {currentPage < totalPages && (
          <PaginationItem>
            <Link
              href={`/search?q=${encodedQuery}&page=${currentPage + 1}`}
              className={pageLinkClass}
            >
              次へ
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
