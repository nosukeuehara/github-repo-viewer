import {RepositoryDetail} from "@/feature/githubRepository/types";

export function buildRepositoryStats(repo: RepositoryDetail) {
  return [
    {label: "Stars", value: repo.stargazers_count},
    {label: "Watchers", value: repo.watchers_count},
    {label: "Forks", value: repo.forks_count},
    {label: "Issues", value: repo.open_issues_count},
  ];
}
