import { test, expect } from "@playwright/test";
//import {faker} from '@faker-js/faker'; 

test("TQA-11 total price changes to 0 after order", async ({ page }) => {
  await page.goto("");
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText(
    "Total: $10.00"
  );
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator("Payment details×We will send")).toBeVisible;
  await page.locator('[id="name"]').fill("asdasd");
  await page.locator('[id="email"]').fill("sadasda@adasd.com");
  await page.locator('[id="submit-payment"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText(
    "Total: $0.00"
  );
});

test('TQA-12 make order', async ({ page }) => {
    await page.goto("");
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[id="name"]').fill("Olga");
    await page.locator('[id="email"]').fill("olga@gmail.com");
    await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test("TQA-13 buy 2 cups of coffee", async ({ page }) => {
    await page.goto("");
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await expect(page.locator("[href='/cart']")).toContainText("cart (2)");
    page.locator("[href='/cart']").click();
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
    await page.locator("#name").fill("уфуф");
    await page.locator("#email").fill("asdasd@as.com");
    await page.locator("#submit-payment").click();
    await expect(page.locator("[href='/cart']")).toContainText("cart (0)");
  });

  test("TQA-14 delete order", async ({ page }) => {
    await page.goto("");
    await page.locator('[data-test="Cafe_Breve"]').click();
    await page.getByRole("link", { name: "Cart page" }).click();
    await expect(
      page.locator("div").filter({ hasText: /^Cafe Breve$/ })
    ).toBeVisible();
    await expect(page.locator("#app")).toContainText("Cafe Breve");
    await page.getByRole("button", { name: "Remove all Cafe Breve" }).click();
    await expect(page.getByText("No coffee, go add some.")).toBeVisible();
  });

  test("TQA-15 confirm order", async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await page.locator('[data-test="Cappuccino"]').click();
    await (page.locator("[href='/cart']")).click();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await page.locator('[data-test="checkout"]').click();
    await page.locator("#name").fill("Yulya");
    await page.locator('[id="email"]').fill("yulya@gmail.com");
    await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.getByRole("button", { name: "Thanks for your purchase." })
    ).toBeVisible();
  });

  


  

