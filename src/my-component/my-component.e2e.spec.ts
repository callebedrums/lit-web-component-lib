import { test, expect } from "@playwright/test";

test.describe("My Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/");
  });

  test("My Component shows 'Lit Web Component Lib'", async ({ page }) => {
    await expect(page.locator("my-component h1")).toHaveText("Lit Web Component Lib");
  });
});
