import { test, expect } from "@playwright/test";

test("TQA-6 total price changes to 0 after order", async ({ page }) => {
  await page.goto("");
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText(
    "Total: $10.00"
  );
  await page.locator('[data-test="checkout"]').click();
  await expect(page.getByText("Payment details×We will send")).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Name" })).toBeEmpty();
  await expect(page.getByRole("textbox", { name: "Email" })).toBeEmpty();
  await page.getByRole("textbox", { name: "Name" }).fill("asdasd");
  await page.getByRole("textbox", { name: "Email" }).fill("sadasda@adasd.com");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText(
    "Total: $0.00"
  );
});

test("TQA-7 cart increment button and card delete button", async ({ page }) => {
  await page.goto("");
  await expect(page.getByLabel("Cart page")).toContainText("cart (0)");
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.getByLabel("Cart page")).toContainText("cart (1)");
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect(page.locator("#app")).toContainText("$10.00 x 1");
  await page.getByRole("button", { name: "Add one Espresso" }).click();
  await expect(page.locator("#app")).toContainText("$10.00 x 2");
  await expect(page.locator("#app")).toContainText("$20.00");
  await page.getByRole("button", { name: "Remove all Espresso" }).click();
  await expect(page.getByText("No coffee, go add some.")).toBeVisible();
  
});

test("TQA-8 buy 2 cups of coffee", async ({ page }) => {
  await page.goto("");
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.getByLabel("Cart page")).toContainText("cart (2)");
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect(
    page.locator("div").filter({ hasText: /^Cappuccino$/ })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Espresso$/ })
  ).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toContainText(
    "Total: $29.00"
  );
  await page.locator('[data-test="checkout"]').click();

  await page.getByRole("textbox", { name: "Name" }).fill("уфуф");
  await page.getByRole("textbox", { name: "Email" }).fill("asdasd@as.com");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("Cart page")).toContainText("cart (0)");
});

test("TQA-9 delete order", async ({ page }) => {
  await page.goto("");
  await page.getByRole("link", { name: "Menu page" }).click();
  await page.locator('[data-test="Cafe_Breve"]').click();
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect(
    page.locator("div").filter({ hasText: /^Cafe Breve$/ })
  ).toBeVisible();
  await expect(page.locator("#app")).toContainText("Cafe Breve");
  await page.getByRole("button", { name: "Remove all Cafe Breve" }).click();
  await expect(page.getByText("No coffee, go add some.")).toBeVisible();
});

test("TQA-10 confirm order", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole("textbox", { name: "Name" }).fill("Yulay");
  await page.getByRole("textbox", { name: "Email" }).fill("yy@gmail.com");
  await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("button", { name: "Thanks for your purchase." })
  ).toBeVisible();
});
