import { test, expect } from "@playwright/test";

test("TQA-001 total price changes to 0 after order", async ({ page }) => {
  const url = "";
  const espressoLocator = '[data-test="Espresso"]';
  const checkoutLocator = '[data-test="checkout"]';
  const nameInputLocator = "#name";
  const emailInputLocator = "#email";
  const submitPaymentSelector = "#submit-payment";

  const initialTotalText = "Total: $10.00";
  const finalTotalText = "Total: $0.00";
  const paymentDetailsText = "Payment details×We will send";

  const customerName = "asdasd";
  const customerEmail = "sadasda@adasd.com";

  await page.goto(url);

  await page.locator(espressoLocator).click();
  await expect(page.locator(checkoutLocator)).toContainText(initialTotalText);
  await page.locator(checkoutLocator).click();
  await expect(page.locator(`text=${paymentDetailsText}`)).toBeVisible();

  await page.locator(nameInputLocator).fill(customerName);
  await page.locator(emailInputLocator).fill(customerEmail);
  await page.locator(submitPaymentSelector).click();

  await expect(page.locator(checkoutLocator)).toContainText(finalTotalText);
});

test("TQA-002 make order", async ({ page }) => {
  const url = "";
  const espressoLocator = '[data-test="Espresso"]';
  const checkoutLocator = '[data-test="checkout"]';
  const nameInputLocator = '[id="name"]';
  const emailInputLocator = '[id="email"]';
  const promotionCheckboxRole = { name: "Promotion checkbox" };
  const submitButtonRole = { name: "Submit" };

  const customerName = "Helga";
  const customerEmail = "helha@gmail.com";

  await page.goto(url);

  await page.locator(espressoLocator).click();
  await page.locator(checkoutLocator).click();
  await page.locator(nameInputLocator).fill(customerName);
  await page.locator(emailInputLocator).fill(customerEmail);

  await page.getByRole("checkbox", promotionCheckboxRole).check();
  await page.getByRole("button", submitButtonRole).click();
});

test("TQA-003 confirm order", async ({ page }) => {
  const url = "";
  const productLocator = '[data-test="Cappuccino"]';
  const cartLinkLocator = '[href="/cart"]';
  const checkoutLocator = '[data-test="checkout"]';
  const nameInputLocator = "#name";
  const emailInputLocator = "#email";
  const promotionCheckboxRole = { name: "Promotion checkbox" };
  const submitButtonRole = { name: "Submit" };
  const successButtonRole = { name: "Thanks for your purchase." };

  const customerName = "Yulya";
  const customerEmail = "yulya@gmail.com";

  await page.goto(url);

  await page.locator(productLocator).click();
  await page.locator(cartLinkLocator).click();
  await expect(page.locator(checkoutLocator)).toBeVisible();
  await page.locator(checkoutLocator).click();
  await page.locator(nameInputLocator).fill(customerName);
  await page.locator(emailInputLocator).fill(customerEmail);
  await page.getByRole("checkbox", promotionCheckboxRole).check();
  await page.getByRole("button", submitButtonRole).click();
  await expect(page.getByRole("button", successButtonRole)).toBeVisible();
});

test("TQA-004 buy 2 cups of coffee", async ({ page }) => {
  const url = "";
  const firstProductTestId = "Espresso";
  const secondProductTestId = "Cappuccino";
  const cartLinkHref = "/cart";
  const checkoutTestId = "checkout";
  const expectedCartText = "cart (2)";
  const expectedTotalText = "Total: $29.00";
  const userName = "Петро";
  const userEmail = "asdasd@as.com";
  const submitPaymentId = "#submit-payment";

  await page.goto(url);

  await page.locator(`[data-test="${firstProductTestId}"]`).click();
  await page.locator(`[data-test="${secondProductTestId}"]`).click();
  await expect(page.locator(`[href='${cartLinkHref}']`)).toContainText(
    expectedCartText
  );
  await page.locator(`[href='${cartLinkHref}']`).click();

  await expect(
    page
      .locator("div")
      .filter({ hasText: new RegExp(`^${secondProductTestId}$`) })
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: new RegExp(`^${firstProductTestId}$`) })
  ).toBeVisible();

  await expect(page.locator(`[data-test="${checkoutTestId}"]`)).toContainText(
    expectedTotalText
  );
  await page.locator(`[data-test="${checkoutTestId}"]`).click();

  await page.locator("#name").fill(userName);
  await page.locator("#email").fill(userEmail);
  await page.locator(submitPaymentId).click();
  await expect(page.locator(`[href='${cartLinkHref}']`)).toContainText(
    "cart (0)"
  );
});
