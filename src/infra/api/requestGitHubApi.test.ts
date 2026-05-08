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

    await expect(requestGitHubApi("/repos/facebook/react")).resolves.toEqual(
      mockData
    );
  });

  it("ステータスが404の場合、NOT_FOUNDエラーを投げる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(requestGitHubApi("/repos/unknown/repo")).rejects.toMatchObject(
      {
        message: "Repository not found",
        code: "NOT_FOUND",
      }
    );
  });

  it("ステータスが403の場合、RATE_LIMITエラーを投げる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 403,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=react")
    ).rejects.toMatchObject({
      message: "GitHub API rate limit exceeded",
      code: "RATE_LIMIT",
    });
  });

  it("ステータスが422の場合、BAD_REQUESTエラーを投げる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 422,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=")
    ).rejects.toMatchObject({
      message: "Invalid search query",
      code: "BAD_REQUEST",
    });
  });

  it("ステータスが503の場合、SERVICE_UNAVAILABLEエラーを投げる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 503,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=react")
    ).rejects.toMatchObject({
      message: "GitHub API is temporarily unavailable",
      code: "SERVICE_UNAVAILABLE",
    });
  });

  it("予期しないステータスの場合、UNKNOWNエラーを投げる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=react")
    ).rejects.toMatchObject({
      message: "Unexpected GitHub API error",
      code: "UNKNOWN",
    });
  });
});
