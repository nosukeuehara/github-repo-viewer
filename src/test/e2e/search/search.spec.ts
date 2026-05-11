import {expect, test} from "@playwright/test";

test("リポジトリ検索ができる", async ({page}) => {
  await page.goto("/search");

  await page.getByRole("textbox").fill("react");

  await page.getByRole("button", {name: "検索"}).click();

  const params = new URLSearchParams({q: "react"});

  await expect
    .poll(() => new URL(page.url()).searchParams.get("q"))
    .toBe(params.get("q"));

  // facebook/reactはない可能性もあるため、完全に安易なテストではあるが
  // 検索結果が表示されていることの簡易的な確認として入れている
  await expect(page.getByText("facebook/react")).toBeVisible();
});

test("ページ遷移ができる", async ({page}) => {
  await page.goto("/search");

  await page.getByRole("textbox").fill("react");

  await page.getByRole("button", {name: "検索"}).click();

  const params = new URLSearchParams({q: "react"});

  await expect
    .poll(() => new URL(page.url()).searchParams.get("q"))
    .toBe(params.get("q"));

  await page.getByRole("link", {name: "Next"}).click();

  await expect
    .poll(() => new URL(page.url()).searchParams.get("page"))
    .toBe("2");
});

test("存在しないリポジトリで「リポジトリが見つかりませんでした。」と表示される", async ({
  page,
}) => {
  const unkownRepo = "0123456789XXXXXXXXXX";
  await page.goto("/search");

  await page.getByRole("textbox").fill(unkownRepo);

  await page.getByRole("button", {name: "検索"}).click();

  const params = new URLSearchParams({q: unkownRepo});

  await expect
    .poll(() => new URL(page.url()).searchParams.get("q"))
    .toBe(params.get("q"));

  await expect(
    page.getByText("リポジトリが見つかりませんでした。")
  ).toBeVisible();
});
