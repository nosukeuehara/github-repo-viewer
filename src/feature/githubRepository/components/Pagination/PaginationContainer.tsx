import {buildRepositoryPagination} from "@/shared/lib/utils";
import {PaginationPresentation} from "./PaginationPresentation";

export function PaginationContainer(props: {
  query: string;
  currentPage: number;
  totalCount: number;
  page: number;
  perPage: number;
}) {
  const pagination = buildRepositoryPagination(props);
  return (
    <PaginationPresentation currentPage={props.page} pagination={pagination} />
  );
}
