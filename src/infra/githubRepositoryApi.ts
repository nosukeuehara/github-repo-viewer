import {repositorySchema} from "@/feature/githubRepository/schemas/repositorySchema";

// TODO:
// APIコールは専用のラッパー関数を通して行うようにする。
// - fetchの共通処理（baseURL、headersなど）を集約
// - ステータスコードに応じたエラーハンドリングを統一
// - ネットワークエラーとアプリケーションエラーを分離
// - 将来的にResult型（success / error）で返せるようにする
// これにより呼び出し側は例外ではなく状態として扱えるようにする。

const GITHUB_API_BASE_URL = "https://api.github.com";

export async function fetchGitHubRepositories(query: string) {
  return fetch(
    `${GITHUB_API_BASE_URL}/search/repositories?q=${encodeURIComponent(query)}+in:name`,
    {
      next: {revalidate: 60},
    }
  );
}

export async function searchRepositories(query?: string) {
  if (!query) return [];

  const res = await fetchGitHubRepositories(query);

  if (!res.ok) {
    throw new Error(`GitHub API Error: ${res.status}`);
  }

  const data: {items: unknown[]} = await res.json();

  return data.items.flatMap((repo) => {
    const result = repositorySchema.safeParse(repo);
    return result.success ? [result.data] : [];
  });
}
