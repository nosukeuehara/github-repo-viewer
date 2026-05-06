import {RepositoryDetail} from "@/feature/githubRepository/types";
import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildRepositoryStats(repo: RepositoryDetail) {
  return [
    {label: "Stars", value: repo.stargazers_count},
    {label: "Watchers", value: repo.watchers_count},
    {label: "Forks", value: repo.forks_count},
    {label: "Issues", value: repo.open_issues_count},
  ];
}

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

export const PER_PAGE = 15;
