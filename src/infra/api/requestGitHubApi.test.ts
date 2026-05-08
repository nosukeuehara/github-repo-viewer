import {afterEach, describe, expect, it, vi} from "vitest";
import {requestGitHubApi} from "./requestGitHubApi";

describe("requestGitHubApi", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("リクエストが成功したときに適切なJsonを返す", async () => {
    const mockData = {
      id: 1,
      name: "react",
    };

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await expect(requestGitHubApi("/repos/facebook/react")).resolves.toEqual({
      ok: true,
      data: mockData,
    });
  });

  it("ステータスが404の場合、NOT_FOUNDエラーを返す", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(requestGitHubApi("/repos/unknown/repo")).resolves.toEqual({
      ok: false,
      error: {code: "NOT_FOUND"},
    });
  });

  it("ステータスが403の場合、RATE_LIMITエラーを返す", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 403,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=react")
    ).resolves.toEqual({
      ok: false,
      error: {code: "RATE_LIMIT"},
    });
  });

  it("ステータスが422の場合、BAD_REQUESTエラーを返す", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 422,
    } as Response);

    await expect(requestGitHubApi("/search/repositories?q=")).resolves.toEqual({
      ok: false,
      error: {code: "BAD_REQUEST"},
    });
  });

  it("ステータスが503の場合、SERVICE_UNAVAILABLEエラーを返す", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 503,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=react")
    ).resolves.toEqual({
      ok: false,
      error: {code: "SERVICE_UNAVAILABLE"},
    });
  });

  it("予期しないステータスの場合、エラーを投げる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=react")
    ).rejects.toThrow("Unexpected GitHub API error");
  });
});
