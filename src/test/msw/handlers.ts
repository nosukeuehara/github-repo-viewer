import {http, HttpResponse} from "msw";

// モックデータ: 検索結果
const mockSearchResponse = {
  total_count: 100,
  items: [
    {
      id: 10270250,
      name: "react",
      full_name: "facebook/react",
      url: "https://api.github.com/repos/facebook/react",
      owner: {
        avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
      },
    },
    {
      id: 75396575,
      name: "react-native",
      full_name: "facebook/react-native",
      url: "https://api.github.com/repos/facebook/react-native",
      owner: {
        avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
      },
    },
    {
      id: 135786093,
      name: "react-router",
      full_name: "remix-run/react-router",
      url: "https://api.github.com/repos/remix-run/react-router",
      owner: {
        avatar_url: "https://avatars.githubusercontent.com/u/64235328?v=4",
      },
    },
  ],
};

// モックデータ: リポジトリ詳細
const mockRepoDetail = {
  id: 10270250,
  name: "react",
  full_name: "facebook/react",
  description: "The library for web and native user interfaces.",
  url: "https://api.github.com/repos/facebook/react",
  html_url: "https://github.com/facebook/react",
  stargazers_count: 230000,
  watchers_count: 230000,
  forks_count: 47000,
  open_issues_count: 900,
  owner: {
    login: "facebook",
    avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
  },
  created_at: "2013-05-24T16:15:54Z",
  updated_at: "2024-01-01T00:00:00Z",
};

// モックデータ: 言語情報
const mockLanguages = {
  JavaScript: 2000000,
  TypeScript: 500000,
  HTML: 100000,
  CSS: 50000,
};

export const handlers = [
  // 検索API
  http.get("https://api.github.com/search/repositories", ({request}) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";

    // 存在しないリポジトリ検索の場合は空結果を返す
    if (query.includes("0123456789XXXXXXXXXX")) {
      return HttpResponse.json({
        total_count: 0,
        items: [],
      });
    }

    return HttpResponse.json(mockSearchResponse);
  }),

  // リポジトリ詳細API
  http.get("https://api.github.com/repos/:owner/:repo", ({params}) => {
    const {owner, repo} = params;

    // 存在しないリポジトリの場合は404を返す
    if (owner === "aaaaaaaa" && repo === "bbbbbbbb") {
      return new HttpResponse(null, {status: 404});
    }

    // facebook/reactの場合はモックデータを返す
    if (owner === "facebook" && repo === "react") {
      return HttpResponse.json(mockRepoDetail);
    }

    // その他のリポジトリも同じモックデータを返す（ownerとrepoを上書き）
    return HttpResponse.json({
      ...mockRepoDetail,
      name: repo,
      full_name: `${owner}/${repo}`,
      owner: {
        ...mockRepoDetail.owner,
        login: String(owner),
      },
    });
  }),

  // 言語情報API
  http.get(
    "https://api.github.com/repos/:owner/:repo/languages",
    ({params}) => {
      const {owner, repo} = params;

      // 存在しないリポジトリの場合は404を返す
      if (owner === "aaaaaaaa" && repo === "bbbbbbbb") {
        return new HttpResponse(null, {status: 404});
      }

      return HttpResponse.json(mockLanguages);
    }
  ),
];
