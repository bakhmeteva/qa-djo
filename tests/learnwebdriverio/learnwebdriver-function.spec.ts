import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register");
});

test("add articles", async ({ page }) => {
  const username = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  const articleTitle = "My New Article";
  const description = "Some description";
  const body = "Some body of article";
  const tags = "tag 01, tag 02";

  const numberOfArticles = 3;
  const actualNumberOfArticles = page.locator(
    '[data-qa-type="article-list"] [data-qa-type="article-preview"]'
  );

  await registerNewUser(page, username, email, password);
  await createArticles(
    page,
    articleTitle,
    description,
    body,
    tags,
    numberOfArticles
  );
  await openListOfArticles(page, username);

  await expect(actualNumberOfArticles).toHaveCount(numberOfArticles);
});

async function registerNewUser(
  page: Page,
  username: string,
  email: string,
  password: string
) {
  await page.locator('[placeholder="Username"]').fill(username);
  await page.locator('[placeholder="Email"]').fill(email);
  await page.locator('[placeholder="Password"]').fill(password);
  await page.locator("button.btn-lg").click();
}

async function createArticles(
  page: Page,
  articleTitle: string,
  description: string,
  body: string,
  tags: string,
  numberOfArticles = 1
) {
  for (let i = 1; i <= numberOfArticles; i++) {
    const tittle = `${articleTitle} ${i}`;
    await page.locator('a[href="/editor"]').click();
    await page.locator('[placeholder="Article Title"]').fill(tittle);
    await page.locator('[data-qa-id="editor-description"]').fill(description);
    await page.locator(".auto-textarea-input").fill(body);
    await page.locator('[placeholder="Enter tags"]').fill(tags);
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("h1")).toHaveText(tittle);
  }
}

const openListOfArticles = async (page: Page, username: string) =>
  await page.locator('[data-qa-type="author-name"]').nth(0).click();
