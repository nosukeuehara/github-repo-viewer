import {beforeEach, describe, expect, it, vi} from "vitest";
import {
  fetchGitHubRepositories,
  fetchGitHubRepositoryDetail,
  fetchLanguages,
} from "./githubApiClient";
import {requestGitHubApi} from "./requestGitHubApi";

vi.mock("./requestGitHubApi", () => ({
  requestGitHubApi: vi.fn(),
}));

const mockedRequestGitHubApi = vi.mocked(requestGitHubApi);

describe("githubApiClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GitHub検索APIへ正しいURLを渡す", async () => {
    await fetchGitHubRepositories(12, "react", 2);

    expect(mockedRequestGitHubApi).toHaveBeenCalledWith(
      "/search/repositories?q=react+in%3Aname&page=2&per_page=12"
    );
  });

  it("owner/repoをencodeして詳細取得APIへ渡す", async () => {
    await fetchGitHubRepositoryDetail("foo/bar", "react repo");

    expect(mockedRequestGitHubApi).toHaveBeenCalledWith(
      "/repos/foo%2Fbar/react%20repo"
    );
  });

  it("owner/repoをencodeして言語取得APIへ渡す", async () => {
    await fetchLanguages("foo/bar", "react repo");

    expect(mockedRequestGitHubApi).toHaveBeenCalledWith(
      "/repos/foo%2Fbar/react%20repo/languages"
    );
  });
});
