import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("TQA-1 instal playwright", async ({ page }) => {
  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("link", { name: "Installation" }).click();
  await page.getByRole("link", { name: "How to install Playwright" }).click();
  await expect(page.getByText("init playwright@latest")).toBeVisible();
  await page
    .getByRole("tabpanel")
    .filter({ hasText: "npm init playwright@latest" })
    .getByLabel("Copy code to clipboard")
    .click();
});

test("TQA-2 copy pnpm command", async ({ page }) => {
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page.getByRole("article")).toContainText(
    "playwright.config.tspackage.jsonpackage-lock.jsontests/ example.spec.tstests-examples/ demo-todo-app.spec.ts"
  );
  await page
    .locator("div")
    .filter({
      hasText:
        /^npmyarnpnpmnpx playwright testyarn playwright testpnpm exec playwright test$/,
    })
    .getByRole("tab")
    .nth(2)
    .click();
  await expect(
    page.getByRole("code").filter({ hasText: /^pnpm exec playwright test$/ })
  ).toBeVisible();
  await page
    .getByRole("tabpanel")
    .filter({ hasText: /^pnpm exec playwright test$/ })
    .getByLabel("Copy code to clipboard")
    .click();
});

test("TQA-3 search", async ({ page }) => {
  await expect(
    page.getByRole("button", { name: "Search (Command+K)" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Search (Command+K)" }).click();
  await page.getByRole("searchbox", { name: "Search" }).fill("npm");
  await expect(page.locator("#docsearch-hits0-item-2")).toContainText(
    "The npm init playwright command is now generally available for …Release notes"
  );
  await page.getByRole("link", { name: "The npm init playwright" }).click();
  await expect(page.locator("#create-playwright")).toContainText(
    "Create Playwright"
  );
  await expect(page.getByRole("main")).toContainText(
    "The npm init playwright command is now generally available for your use:"
  );
});

test("TQA-4 advanced configuration", async ({ page }) => {
  await expect(page.getByRole("link", { name: "Docs" })).toBeVisible();

  await page.getByRole("link", { name: "Docs" }).click();
  await page.locator("link").click();
  
  await page.getByRole("link", { name: "Test configuration" }).click();
  await expect(
    page.getByRole("heading", { name: "Advanced ConfigurationDirect" })
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Copy code to clipboard" })
    .nth(2)
    .click();
});

test("TQA-5 github link", async ({ page }) => {
  const page1Promise = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: "Star microsoft/playwright on" })
    .click();
  const page1 = await page1Promise;
  await expect(page1.getByRole("combobox", { name: "Go to file" })).toBeEmpty();
  await expect(page1).toHaveURL("https://github.com/microsoft/playwright");
});


