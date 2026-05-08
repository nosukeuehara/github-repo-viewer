import {parseSearchParams} from "@/feature/githubRepository/lib/parseSearchParams";
import {RepositorySearch} from "@/template/RepositorySearchTemplate/RepositorySearchTemplate";

type SearchParams = Promise<{
  q?: string;
  page?: string;
}>;

export default async function Page(props: {searchParams: SearchParams}) {
  const {query, page} = parseSearchParams(await props.searchParams);

  return <RepositorySearch param={query} page={page} />;
}
