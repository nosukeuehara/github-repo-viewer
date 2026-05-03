import {render, screen} from "@testing-library/react";
import {RepositoryListPresentation} from "./RepositorySearchResultListPresentation";
import "@testing-library/jest-dom/vitest";

const repositories = [
  {
    id: 1,
    name: "react",
    full_name: "facebook/react",
    url: "https://api.github.com/repos/facebook/react",
    owner: {
      avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
    },
  },
];

describe("RepositoryListPresentation", () => {
  it("リポジトリ一覧を表示する", () => {
    render(
      <RepositoryListPresentation query="react" repositories={repositories} />
    );

    expect(
      screen.getByRole("heading", {name: /検索結果 ： "react"/})
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {name: /facebook\/react/i})
    ).toHaveAttribute("href", "/repo/facebook/react");

    expect(
      screen.getByRole("img", {name: "facebook/react のオーナーアイコン"})
    ).toBeInTheDocument();
  });

  it("リポジトリが見つからない場合はメッセージを表示する", () => {
    render(
      <RepositoryListPresentation query="unknown-repo" repositories={[]} />
    );

    expect(
      screen.getByText(/リポジトリが見つかりませんでした。/)
    ).toBeInTheDocument();
  });
});
