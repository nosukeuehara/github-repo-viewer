import {RepositorySearch} from "@/template/RepositorySearchTemplate/RepositorySearchTemplate";

type SearchParams = Promise<{
  q?: string;
  page?: string;
}>;

export default async function Page(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;

  const query =
    typeof searchParams.q === "string" ? searchParams.q.trim() : undefined;

  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) || 1 : 1;

  return <RepositorySearch param={query} page={page} />;
}
