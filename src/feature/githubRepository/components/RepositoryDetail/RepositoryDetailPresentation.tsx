import Image from "next/image";
import {RepositoryDetail} from "../../types";

// TODO : 言語は複数取得するために別途APIをコールする

export function RepositoryDetailPresentation(props: RepositoryDetail) {
  return (
    <div>
      <h2>{props.name}</h2>
      <Image
        src={props.owner.avatar_url}
        alt="Owner Icon"
        width={50}
        height={50}
      />
      <p>{props.description}</p>
      <p>Language: {props.language}</p>
      <p>Stars: {props.stargazers_count}</p>
      <p>Watchers: {props.watchers_count}</p>
      <p>Forks: {props.forks_count}</p>
      <p>Issues: {props.open_issues_count}</p>
    </div>
  );
}
