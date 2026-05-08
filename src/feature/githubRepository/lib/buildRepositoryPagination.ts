export function buildRepositoryPagination({
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

  return {
    totalPages,
    encodedQuery,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    previousHref: `/search?q=${encodedQuery}&page=${currentPage - 1}`,
    nextHref: `/search?q=${encodedQuery}&page=${currentPage + 1}`,
    shouldShow: totalPages > 1,
  };
}
