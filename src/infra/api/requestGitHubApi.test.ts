import {afterEach, describe, expect, it, vi} from "vitest";
import {requestGitHubApi} from "./requestGitHubApi";
import {AppError} from "../errors/AppError";

describe("requestGitHubApi", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns json response when request succeeds", async () => {
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

  it("throws NOT_FOUND error when status is 404", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(
      requestGitHubApi("/repos/unknown/repo")
    ).rejects.toBeInstanceOf(AppError);

    await expect(requestGitHubApi("/repos/unknown/repo")).rejects.toMatchObject(
      {
        message: "Repository not found",
        status: 404,
        code: "NOT_FOUND",
      }
    );
  });

  it("throws RATE_LIMIT error when status is 403", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 403,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=react")
    ).rejects.toMatchObject({
      status: 403,
      code: "RATE_LIMIT",
    });
  });

  it("throws BAD_REQUEST error when status is 422", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 422,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=")
    ).rejects.toMatchObject({
      status: 422,
      code: "BAD_REQUEST",
    });
  });

  it("throws SERVICE_UNAVAILABLE error when status is 503", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 503,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=react")
    ).rejects.toMatchObject({
      status: 503,
      code: "SERVICE_UNAVAILABLE",
    });
  });

  it("throws UNKNOWN error for unexpected status", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(
      requestGitHubApi("/search/repositories?q=react")
    ).rejects.toMatchObject({
      status: 500,
      code: "UNKNOWN",
    });
  });
});
