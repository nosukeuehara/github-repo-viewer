import {RepositoryDetail} from "@/template/RepositoryDetailTemplate/RepositoryDetailTemplate";

type Params = Promise<{slug: string[]}>;

export default async function Page(props: {params: Params}) {
  const {slug} = await props.params;

  const [owner, repo] = slug;

  return <RepositoryDetail owner={owner} repo={repo} />;
}
