import {parseRepositorySlug} from "@/feature/githubRepository/lib/parseRepositorySlug";
import {RepositoryDetail} from "@/template/RepositoryDetailTemplate/RepositoryDetailTemplate";

type Params = Promise<{slug?: string[]}>;

export default async function Page(props: {params: Params}) {
  const {owner, repo} = parseRepositorySlug((await props.params).slug);

  return <RepositoryDetail owner={owner} repo={repo} />;
}
