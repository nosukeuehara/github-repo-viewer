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

describe("buildRepositoryPagination", () => {
  it("現在のページが１の場合、リポジトリのページネーションを正しく構築できること", () => {
    const pagination = buildRepositoryPagination({
      query: "react",
      currentPage: 1,
      totalCount: 50,
      perPage: 10,
    });
    expect(pagination).toEqual({
      totalPages: 5,
      encodedQuery: "react",
      hasPreviousPage: false,
      hasNextPage: true,
      previousHref: "/search?q=react&page=0",
      nextHref: "/search?q=react&page=2",
      shouldShow: true,
    });
  });

  it("現在のページが２の場合、リポジトリのページネーションを正しく構築できること", () => {
    const pagination = buildRepositoryPagination({
      query: "react",
      currentPage: 2,
      totalCount: 50,
      perPage: 10,
    });
    expect(pagination).toEqual({
      totalPages: 5,
      encodedQuery: "react",
      hasPreviousPage: true,
      hasNextPage: true,
      previousHref: "/search?q=react&page=1",
      nextHref: "/search?q=react&page=3",
      shouldShow: true,
    });
  });
});
