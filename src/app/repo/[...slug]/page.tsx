import {notFound} from "next/navigation";
import {RepositoryDetail} from "@/template/RepositoryDetailTemplate/RepositoryDetailTemplate";

type Params = Promise<{slug?: string[]}>;

function parseRepositorySlug(slug?: string[]) {
  if (!slug || slug.length !== 2) {
    notFound();
  }

  const [owner, repo] = slug;

  if (!owner.trim() || !repo.trim()) {
    notFound();
  }

  return {
    owner,
    repo,
  };
}

export default async function Page(props: {params: Params}) {
  const {slug} = await props.params;

  const {owner, repo} = parseRepositorySlug(slug);

  return <RepositoryDetail owner={owner} repo={repo} />;
}
