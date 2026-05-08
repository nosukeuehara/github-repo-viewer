import {fetchGitHubRepositoryDetail} from "@/infra/api/githubApiClient";
import {getRepositoryDetail} from "../getRepositoryDetail/getRepositoryDetail";

vi.mock("@/infra/api/githubApiClient", () => ({
  fetchGitHubRepositoryDetail: vi.fn(),
}));

const mockedFetchGitHubRepositoryDetail = vi.mocked(
  fetchGitHubRepositoryDetail
);

const validMockResponse = {
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

describe("getRepositoryDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("正しい owner / repo で API を呼び、リポジトリ詳細を返す", async () => {
    mockedFetchGitHubRepositoryDetail.mockResolvedValue(validMockResponse);

    const result = await getRepositoryDetail("test-user", "test-repo");

    // APIが正しい引数で呼び出されることを確認
    expect(mockedFetchGitHubRepositoryDetail).toHaveBeenCalledWith(
      "test-user",
      "test-repo"
    );
    // 返されるデータがスキーマに従っていることを確認
    expect(result).toEqual(validMockResponse);
  });

  it("description が null の場合でも正常に返す", async () => {
    const response = {
      ...validMockResponse,
      description: null,
    };

    mockedFetchGitHubRepositoryDetail.mockResolvedValue(response);

    const result = await getRepositoryDetail("test-user", "test-repo");

    // description が null の場合でも正常に返されることを確認
    expect(result).toEqual(response);
  });

  it("APIレスポンスが schema と一致しない場合、エラーを投げる", async () => {
    mockedFetchGitHubRepositoryDetail.mockResolvedValue({
      ...validMockResponse,
      id: "invalid-id",
    });

    // APIレスポンスが schema と一致しない場合、エラーが投げられることを確認
    await expect(getRepositoryDetail("test-user", "test-repo")).rejects.toThrow(
      "Unexpected GitHub API error"
    );
  });
});
