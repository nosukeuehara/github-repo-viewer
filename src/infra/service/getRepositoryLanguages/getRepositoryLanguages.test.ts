import {fetchLanguages} from "@/infra/api/githubApiClient";
import {getRepositoryLanguages} from "./getRepositoryLanguages";

vi.mock("@/infra/api/githubApiClient", () => ({
  fetchLanguages: vi.fn(),
}));

const mockedFetchLanguages = vi.mocked(fetchLanguages);

const validMockResponse = {
  TypeScript: 50000,
  JavaScript: 30000,
  CSS: 10000,
};

describe("getRepositoryLanguages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("正しい owner / repo で API を呼び、言語情報を返す", async () => {
    mockedFetchLanguages.mockResolvedValue({
      ok: true,
      data: validMockResponse,
    });

    const result = await getRepositoryLanguages("test-user", "test-repo");

    // APIが正しい引数で呼び出されることを確認
    expect(mockedFetchLanguages).toHaveBeenCalledWith("test-user", "test-repo");
    // 返されるデータがスキーマに従っていることを確認
    expect(result).toEqual({
      ok: true,
      data: validMockResponse,
    });
  });

  it("空のオブジェクトの場合でも正常に返す", async () => {
    mockedFetchLanguages.mockResolvedValue({
      ok: true,
      data: {},
    });

    const result = await getRepositoryLanguages("test-user", "test-repo");

    // 空のオブジェクトの場合でも正常に返されることを確認
    expect(result).toEqual({
      ok: true,
      data: {},
    });
  });

  it("APIレスポンスが schema と一致しない場合、エラーを投げる", async () => {
    mockedFetchLanguages.mockResolvedValue({
      ok: true,
      data: {
        TypeScript: "invalid" as unknown as number, // number型でないためスキーマに一致しない
      },
    });

    // APIレスポンスが schema と一致しない場合、エラーが投げられることを確認
    await expect(
      getRepositoryLanguages("test-user", "test-repo")
    ).rejects.toThrow("Unexpected GitHub API error");
  });

  it("APIがエラーを返した場合、エラーを返す", async () => {
    mockedFetchLanguages.mockResolvedValue({
      ok: false,
      error: {code: "NOT_FOUND"},
    });

    const result = await getRepositoryLanguages("test-user", "test-repo");

    expect(result).toEqual({
      ok: false,
      error: {code: "NOT_FOUND"},
    });
  });
});
