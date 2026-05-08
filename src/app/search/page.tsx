import {z} from "zod";
import {RepositorySearch} from "@/template/RepositorySearchTemplate/RepositorySearchTemplate";

type SearchParams = Promise<{
  q?: string;
  page?: string;
}>;

const pageSchema = z.coerce.number().int().positive().catch(1);

export default async function Page(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;

  const query =
    typeof searchParams.q === "string" ? searchParams.q.trim() : undefined;

  const page = pageSchema.parse(searchParams.page);

  return <RepositorySearch param={query} page={page} />;
}
