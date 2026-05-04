import {render, screen} from "@testing-library/react";
import {RepositoryDetailPresentation} from "./RepositoryDetailPresentation";
import type {RepositoryDetail, RepositoryLanguagesResponse} from "../../types";

const mockRepoData: RepositoryDetail = {
  id: 123456,
  name: "test-repo",
  description: "This is a test repository.",
  stargazers_count: 42,
  watchers_count: 22,
  forks_count: 10,
  open_issues_count: 5,
  owner: {
    login: "test-user",
    avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
  },
};

const mockLangData: RepositoryLanguagesResponse = {
  TypeScript: 77468,
  HTML: 3493,
  CSS: 1725,
  JavaScript: 915,
};

describe("RepositoryDetailPresentation", () => {
  it("リポジトリ詳細を表示する", () => {
    render(
      <RepositoryDetailPresentation
        repo={mockRepoData}
        languages={mockLangData}
      />
    );

    expect(
      screen.getByRole("heading", {name: "test-repo"})
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {name: "test-user のアイコン"})
    ).toBeInTheDocument();

    expect(screen.getByText("This is a test repository.")).toBeInTheDocument();

    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    expect(screen.getByText("Stars")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();

    expect(screen.getByText("Watchers")).toBeInTheDocument();
    expect(screen.getByText("22")).toBeInTheDocument();

    expect(screen.getByText("Forks")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    expect(screen.getByText("Issues")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
