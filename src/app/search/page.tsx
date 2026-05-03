import {RepositorySearch} from "@/template/RepositorySearchTemplate/RepositorySearchTemplate";

type SearchParams = Promise<{[key: string]: string | string[] | undefined}>;

export default async function Page(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;

  const queryParam = searchParams.q;
  const query = typeof queryParam === "string" ? queryParam.trim() : undefined;

  // TODO : 検索結果のパージネーションを行う
  return <RepositorySearch param={query} />;
}
