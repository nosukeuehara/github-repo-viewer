import {render, screen} from "@testing-library/react";
import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";

const mockData = {
  id: 123456,
  name: "test-repo",
  description: "This is a test repository.",
  stargazers_count: 42,
  watchers_count: 22,
  forks_count: 10,
  open_issues_count: 5,
  languages: "TypeScript",
  owner: {
    login: "test-user",
    avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
  },
};

describe("RepositoryDetailPresentation", () => {
  it("リポジトリの表示ができる", () => {
    render(
      <RepositoryDetailPresentation
        id={mockData.id}
        name={mockData.name}
        description={mockData.description}
        language={mockData.languages}
        owner={mockData.owner}
        stargazers_count={mockData.stargazers_count}
        watchers_count={mockData.watchers_count}
        forks_count={mockData.forks_count}
        open_issues_count={mockData.open_issues_count}
      />
    );

    expect(
      screen.getByRole("heading", {name: /test-repo/})
    ).toBeInTheDocument();
    expect(screen.getByText(/Language: TypeScript/)).toBeInTheDocument();
    expect(screen.getByText(/Stars: 42/)).toBeInTheDocument();
    expect(screen.getByText(/Watchers: 22/)).toBeInTheDocument();
    expect(screen.getByText(/Forks: 10/)).toBeInTheDocument();
    expect(screen.getByText(/Issues: 5/)).toBeInTheDocument();
  });
});
