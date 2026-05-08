import {describe, expect, it} from "vitest";
import {http, HttpResponse} from "msw";
import {server} from "@/test/msw/server";
import {getRepositoryDetail} from "./getRepositoryDetail";

const mockResponse = {
  id: 123,
  name: "test-repo",
  description: "This is a test repository",
  stargazers_count: 100,
  forks_count: 50,
  watchers_count: 75,
  open_issues_count: 10,
  owner: {
    login: "test-user",
    avatar_url: "https://example.com/avatar.png",
  },
};

describe("getRepositoryDetail integration", () => {
  it("GitHub APIレスポンスを取得してリポジトリ詳細を返す", async () => {
    server.use(
      http.get(
        "https://api.github.com/repos/test-user/test-repo",
        ({request}) => {
          const url = new URL(request.url);

          expect(url.pathname).toBe("/repos/test-user/test-repo");
          return HttpResponse.json(mockResponse);
        }
      )
    );

    await expect(
      getRepositoryDetail("test-user", "test-repo")
    ).resolves.toEqual(mockResponse);
  });
});
