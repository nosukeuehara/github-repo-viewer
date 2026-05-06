import {render, screen} from "@testing-library/react";
import {http, HttpResponse} from "msw";
import {RepositorySearch} from "@/template/RepositorySearchTemplate/RepositorySearchTemplate";
import {server} from "@/test/msw/server";

describe("検索結果のリスト表示テスト", () => {
  it("検索結果を表示する", async () => {
    server.use(
      http.get("https://api.github.com/search/repositories", () => {
        return HttpResponse.json({
          total_count: 1,
          items: [
            {
              id: 1,
              name: "react",
              full_name: "facebook/react",
              url: "https://api.github.com/repos/facebook/react",
              owner: {
                avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
              },
            },
          ],
        });
      })
    );
    render(await RepositorySearch({param: "react", page: 1}));

    expect(await screen.findByText("react")).toBeInTheDocument();
    expect(screen.getByText("facebook/react")).toBeInTheDocument();
    screen.getByRole("link", {
      name: /react/i,
    });
  });

  it("検索結果が0件の場合はメッセージを表示する", async () => {
    server.use(
      http.get("https://api.github.com/search/repositories", () => {
        return HttpResponse.json({
          total_count: 0,
          items: [],
        });
      })
    );

    render(await RepositorySearch({param: "unknown-repository", page: 1}));

    expect(await screen.findByText(/見つかりません/)).toBeInTheDocument();
  });
});
