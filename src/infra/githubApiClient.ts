const GITHUB_API_BASE_URL = "https://api.github.com";

export async function fetchGitHubRepositories(
  query: string,
  page: number,
  perPage = 12
) {
  const params = new URLSearchParams({
    q: `${query} in:name`,
    page: String(page),
    per_page: String(perPage),
  });

  const res = await fetch(
    `${GITHUB_API_BASE_URL}/search/repositories?${params}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: {revalidate: 60},
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API Error: ${res.status}`);
  }

  return res.json() as Promise<{
    items: unknown[];
    total_count: number;
  }>;
}

export async function fetchGitHubRepositoryDetail(owner: string, repo: string) {
  const res = await fetch(
    `${GITHUB_API_BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: {revalidate: 60},
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API Error: ${res.status}`);
  }

  return res.json() as Promise<unknown>;
}

export async function fetchLanguages(owner: string, repo: string) {
  const res = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: {revalidate: 60},
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch languages");
  }

  return res.json() as Promise<unknown>;
}
