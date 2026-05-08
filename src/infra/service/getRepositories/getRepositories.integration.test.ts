import {describe, expect, it} from "vitest";
import {http, HttpResponse} from "msw";
import {server} from "@/test/msw/server";
import {getRepositories} from "./getRepositories";

const mockApiResponse = {
  total_count: 1,
  items: [
    {
      id: 1,
      name: "react",
      full_name: "facebook/react",
      url: "https://api.github.com/repos/facebook/react",
      owner: {
        avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
      },
      dummy_field: "ignored",
    },
  ],
};

const expectedResult = {
  totalCount: 1,
  repositories: [
    {
      id: 1,
      name: "react",
      full_name: "facebook/react",
      url: "https://api.github.com/repos/facebook/react",
      owner: {
        avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
      },
    },
  ],
};

describe("getRepositories integration", () => {
  it("GitHub APIレスポンスを取得して、アプリで使う形に整形できる", async () => {
    server.use(
      http.get("https://api.github.com/search/repositories", ({request}) => {
        const url = new URL(request.url);

        expect(url.searchParams.get("q")).toBe("react in:name");
        expect(url.searchParams.get("page")).toBe("1");
        expect(url.searchParams.get("per_page")).toBe("30");

        return HttpResponse.json(mockApiResponse);
      })
    );

    await expect(getRepositories("react", 1, 30)).resolves.toEqual(
      expectedResult
    );
  });
});
