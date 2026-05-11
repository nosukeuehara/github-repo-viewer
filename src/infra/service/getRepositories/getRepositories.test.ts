import {fetchGitHubRepositories} from "@/infra/api/githubApiClient";
import {getRepositories} from "./getRepositories";

vi.mock("@/infra/api/githubApiClient", () => ({
  fetchGitHubRepositories: vi.fn(),
}));

const mockedFetchGitHubRepositories = vi.mocked(fetchGitHubRepositories);

const validRepository = {
  id: 1,
  name: "react",
  full_name: "facebook/react",
  url: "https://api.github.com/repos/facebook/react",
  owner: {
    avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
  },
};

describe("getRepositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("queryが無い場合、空の配列とtotalCount0を返す", async () => {
    const result = await getRepositories(12, "", 1);

    // APIが呼び出されないことを確認
    expect(mockedFetchGitHubRepositories).not.toHaveBeenCalled();

    // 空の配列とtotalCountが0であることを確認
    expect(result).toEqual({
      ok: true,
      data: {
        repositories: [],
        totalCount: 0,
      },
    });
  });

  it("queryがある場合、正しいリポジトリ情報とtotalCountを返す", async () => {
    mockedFetchGitHubRepositories.mockResolvedValue({
      ok: true,
      data: {
        items: [
          {
            ...validRepository,
            dummy_field:
              "This field is not defined in the schema and should be ignored",
          },
        ],
        total_count: 1,
      },
    });

    const result = await getRepositories(12, "react", 1);

    // APIが正しい引数で呼び出されることを確認
    expect(mockedFetchGitHubRepositories).toHaveBeenCalledWith(12, "react", 1);

    // 返されるデータがスキーマに従っていることを確認（dummy_fieldが含まれていないことも確認）
    expect(result).toEqual({
      ok: true,
      data: {
        repositories: [validRepository],
        totalCount: 1,
      },
    });
  });

  it("APIレスポンスがschemaと一致しない場合、エラーを投げる", async () => {
    // idがnumber型でないため、スキーマに一致しない
    mockedFetchGitHubRepositories.mockResolvedValue({
      ok: true,
      data: {
        total_count: 1,
        items: [
          {
            ...validRepository,
            id: "invalid_id",
          },
        ],
      },
    });

    // APIレスポンスが正しい形式でない場合にエラーが投げられることを確認
    await expect(getRepositories(12, "react", 1)).rejects.toThrow(
      "Unexpected GitHub API error"
    );
  });
});
