import {searchRepositories} from "@/infra/gateway/searchRepositoryGateway";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";

interface Props {
  query?: string;
}

export async function RepositorySearchResultListContainer(props: Props) {
  const repositories = await searchRepositories(props.query);

  return (
    <RepositoryListPresentation
      query={props.query}
      repositories={repositories}
    />
  );
}
