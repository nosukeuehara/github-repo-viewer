import {server} from "@/test/msw/server";
import {http, HttpResponse} from "msw";
import {getRepositoryLanguages} from "./getRepositoryLanguages";

const mockResponse = {
  JavaScript: 100000,
  TypeScript: 50000,
  HTML: 20000,
};

describe("getRepositoryLanguages integration", () => {
  it("GitHub APIレスポンスを取得してリポジトリの使用言語を返す", async () => {
    server.use(
      http.get(
        "https://api.github.com/repos/test-user/test-repo/languages",
        ({request}) => {
          const url = new URL(request.url);

          expect(url.pathname).toBe("/repos/test-user/test-repo/languages");

          return HttpResponse.json(mockResponse);
        }
      )
    );

    await expect(
      getRepositoryLanguages("test-user", "test-repo")
    ).resolves.toEqual({
      ok: true,
      data: mockResponse,
    });
  });
});
