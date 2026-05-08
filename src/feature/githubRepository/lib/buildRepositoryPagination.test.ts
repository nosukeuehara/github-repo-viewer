import {buildRepositoryPagination} from "./buildRepositoryPagination";

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
