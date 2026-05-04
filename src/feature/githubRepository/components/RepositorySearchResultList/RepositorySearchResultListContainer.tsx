import {getRepositories} from "@/infra/gateway/getRepositories";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";

interface Props {
  query?: string;
}

export async function RepositorySearchResultListContainer(props: Props) {
  const repositories = await getRepositories(props.query);

  return (
    <RepositoryListPresentation
      query={props.query}
      repositories={repositories}
    />
  );
}
