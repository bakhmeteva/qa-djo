import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("make sure user is already exist", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register");
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("Yulya");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("yulya@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("111");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.getByText("username is already taken.")).toBeVisible();
  await page.getByText("email is already taken.").click();
});

test("register user", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register");
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("1234");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.getByRole("link", { name: "ptb" })).toBeVisible();
});

test("invalid data", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register");
  await expect(page.getByRole("link", { name: " Sign in" })).toBeVisible();
  await page.getByRole("link", { name: " Sign in" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("yula@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("111");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("email or password is invalid")).toBeVisible();
});

test("register user and pick the article", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register");
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("Baha");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("baha@gmail.com");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("000");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.locator("#app")).toContainText("My first article");
  await expect(page.locator("#app")).toContainText(
    "Zelenskyy will have face-to-face talks in Istanbul, but will Putin?"
  );
  await expect(
    page.locator("div:nth-child(2) > .article-meta > .btn")
  ).toBeVisible();
  await page.locator("div:nth-child(2) > .article-meta > .btn").click();
});

test("sigh up", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/");
  await page.getByRole("link", { name: "Sign up" }).click();
  await page
    .getByRole("textbox", { name: "Username" })
    .fill(faker.person.firstName());
  await page
    .getByRole("textbox", { name: "Email" })
    .fill(faker.internet.email());
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(faker.internet.password());
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.getByText("Your Feed")).toBeVisible();
});
