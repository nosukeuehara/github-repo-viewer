import {render, screen} from "@testing-library/react";
import {vi} from "vitest";
import {UseFormRegister} from "react-hook-form";
import {SearchRepoParams} from "../../types";
import {RepositorySearchFormPresentation} from "./RepositorySearchFormPresentation";

describe("RepositorySearchFormPresentation", () => {
  // Presentationの表示確認が目的のため、react-hook-formのregisterは最小限のmockにする
  const register = vi.fn(() => ({
    name: "q",
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  })) as unknown as UseFormRegister<SearchRepoParams>;

  it("input と submit button を表示する", () => {
    render(
      <RepositorySearchFormPresentation
        register={register}
        errors={{}}
        onSubmit={vi.fn()}
        isPending={false}
      />
    );

    expect(
      screen.getByPlaceholderText("リポジトリ名を入力")
    ).toBeInTheDocument();

    expect(screen.getByRole("button", {name: "検索"})).toBeInTheDocument();
  });

  it("error message が渡された場合に表示する", () => {
    render(
      <RepositorySearchFormPresentation
        register={register}
        errors={{
          q: {
            type: "manual",
            message: "検索ワードを入力してください",
          },
        }}
        onSubmit={vi.fn()}
        isPending={false}
      />
    );

    expect(
      screen.getByText("検索ワードを入力してください")
    ).toBeInTheDocument();
  });

  it("isPending が true の場合 button を disabled にする", () => {
    render(
      <RepositorySearchFormPresentation
        register={register}
        errors={{}}
        onSubmit={vi.fn()}
        isPending
      />
    );

    expect(screen.getByRole("button", {name: "検索"})).toBeDisabled();
  });
});
