import {expect, test} from "@playwright/test";

test("詳細ページへ遷移できる", async ({page}) => {
  await page.goto("/search?q=react");

  await page
    .getByRole("link", {
      name: /facebook\/react/i,
    })
    .click();

  await expect(page).toHaveURL("/repo/facebook/react");

  await expect(page.getByRole("heading", {name: "react"})).toBeVisible();
});

test("存在しないリポジトリでエラー表示される", async ({page}) => {
  await page.goto("/repo/aaaaaaaa/bbbbbbbb");

  await expect(
    page.getByText("リポジトリが見つかりませんでした。")
  ).toBeVisible();
});
