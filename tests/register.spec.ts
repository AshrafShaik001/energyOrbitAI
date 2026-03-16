import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/login.page";
import { RegisterPage } from "../src/pages/register.page";
import { HeaderPage } from "../src/pages/header.page";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signInWith();
});

test.only("Register New User", async ({ page }) => {
  const headerPage = new HeaderPage(page);
  const registerPage = new RegisterPage(page);

  await headerPage.clickRegisterLink();

  await registerPage.clickUtilityCustomerWithoutAccountNumber();
  await registerPage.typeInAccountName("John Doe");
  await registerPage.typeInAccountNumber("123456");
  await registerPage.typeInStreetNumber("123");
  await registerPage.typeInStreetName("Main Street");
  await registerPage.typeInCity("Any town");
  await registerPage.typeInState("CA");
  await registerPage.typeInPostalCode("12345");
  await registerPage.typeInFirstNameOfPrimaryContact("John");
  await registerPage.typeInLastNameOfPrimaryContact("Doe");
  await registerPage.typeInPassword("Password123!");
  await registerPage.typeInConfirmPassword("Password123!");
  await registerPage.typeInEmail("john.doe2@example.com");
  await registerPage.checkIAcceptTermsConditions();

  await registerPage.clickRegisterButton();
  await registerPage.verifyUnableToCreateUserErrorMessage();
  
});