import { fake } from "@/__tests__/fake";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(`/auth/signup`);
});

test("Should be in signup page", async ({ page }) => {
  await expect(page).toHaveURL(`/auth/signup`);
});

test("Create a new user", async ({ page }) => {
  const user = fake.user.createUser("admin");
  await page.getByPlaceholder("John Doe").fill(user.name);
  await page.getByPlaceholder("Email").fill(user.email);
  await page
    .getByPlaceholder("Password", {
      exact: true,
    })
    .fill(user.password);
  await page.getByPlaceholder("Confirm Password").fill(user.password);

  await page
    .getByRole("button", {
      name: "Sign Up",
    })
    .click();

  await page.waitForURL(/\/onboard/);

  await expect(page).toHaveURL(`/onboard`);
});
