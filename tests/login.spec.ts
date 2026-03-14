import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/login.page";

test("Valid Login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.signInWith();
  
});
