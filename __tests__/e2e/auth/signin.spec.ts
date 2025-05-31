import { fake } from "@/__tests__/fake";
import { createUserInDb } from "@/__tests__/lib/user";
import { test, expect } from "@playwright/test";

const user = fake.user.createUser("admin");
await createUserInDb(user);

test.beforeEach(async ({ page }) => {
  await page.goto(`/auth/signin`);
});

test("Should be in signin page", async ({ page }) => {
  await expect(page).toHaveURL(`/auth/signin`);
});

test("Create a new user", async ({ page }) => {
  await page.getByPlaceholder("Email").fill(user.email);
  await page
    .getByPlaceholder("Password", {
      exact: true,
    })
    .fill(user.password);

  await page
    .getByRole("button", {
      name: "Login",
    })
    .click();

  await page.waitForURL(/\/onboard/);

  await expect(page).toHaveURL(`/onboard`);
});
