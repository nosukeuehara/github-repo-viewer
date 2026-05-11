import {expect, test} from "@playwright/test";

test("/searchへリダイレクトされる", async ({page}) => {
  await page.goto("/");

  await expect(page).toHaveURL("http://localhost:3000/search");

  await expect(page).toHaveTitle(/GitHub Repo Explore/);
});
