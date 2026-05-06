import {http, HttpResponse} from "msw";
import {render, screen} from "@testing-library/react";
import {RepositoryDetailContainer} from "@/feature/githubRepository/components/RepositoryDetail/RepositoryDetailContainer";
import {server} from "@/test/msw/server";

describe("RepoDetailPage", () => {
  it("リポジトリの詳細ページを表示する", async () => {
    server.use(
      http.get("https://api.github.com/repos/facebook/react", () => {
        return HttpResponse.json({
          id: 1,
          name: "react",
          description: "A JavaScript library for building user interfaces",
          stargazers_count: 235000,
          forks_count: 48000,
          watchers_count: 235000,
          open_issues_count: 1200,
          owner: {
            login: "facebook",
            avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
          },
        });
      }),

      http.get("https://api.github.com/repos/facebook/react/languages", () => {
        return HttpResponse.json({
          JavaScript: 100000,
          TypeScript: 50000,
        });
      })
    );

    render(
      await RepositoryDetailContainer({
        owner: "facebook",
        repo: "react",
      })
    );

    expect(await screen.findByText("react")).toBeInTheDocument();
  });
});
