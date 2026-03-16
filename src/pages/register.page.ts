import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { QDriverLocator } from "qdriver";

type LocatorLike = Locator | QDriverLocator;

export class RegisterPage extends BasePage {
  readonly utilityCustomerWithAccountNumberLink: LocatorLike;
  readonly utilityCustomerWithoutAccountNumberLink: LocatorLike;
  readonly tradeAllyContractorLink: LocatorLike;

  // Account Information Locators
  readonly accountNameInput: LocatorLike;
  readonly accountNumberInput: LocatorLike;
  readonly streetNumberInput: LocatorLike;
  readonly streetNameInput: LocatorLike;
  readonly cityInput: LocatorLike;
  readonly stateInput: LocatorLike;
  readonly postalCodeInput: LocatorLike;

  // User Information Locators 
  readonly firstNameOfPrimaryContactInput: LocatorLike;
  readonly lastNameOfPrimaryContactInput: LocatorLike;
  readonly passwordInput: LocatorLike;
  readonly confirmPasswordInput: LocatorLike;
  readonly emailInput: LocatorLike;
  readonly iAcceptTermsConditionsCheckbox: LocatorLike;
  readonly registerButton: LocatorLike;

  readonly unableToCreateUserErrorMessage: LocatorLike;

  constructor(page: Page) {
    super(page);
    this.utilityCustomerWithAccountNumberLink = this.locator(
      "a[title='Utility Customer With Account Number']",
      "Utility Customer with Account Number link on register page"
    );
    this.utilityCustomerWithoutAccountNumberLink = this.locator(
      "a[title='Utility Customer Without Account Number']",
      "Utility Customer without Account Number link on register page"
    );
    this.tradeAllyContractorLink = this.locator(
      "a[title='Trade Ally / Contractor']",
      "Trade Ally Contractor link on register page"
    );

    // Account Information Locators
    this.accountNameInput = this.locator(
      "//label[normalize-space(text())='Account Name']//parent::div//input",
      "Account Name input on registration page"
    );
    this.accountNumberInput = this.locator(
      "//label[normalize-space(text())='Account Number']//parent::div//input",
      "Account Number input on registration page"
    );
    this.streetNumberInput = this.locator(
      "//label[normalize-space(text())='Street Number']//parent::div//input",
      "Street Number input on registration page"
    );
    this.streetNameInput = this.locator(
      "//label[normalize-space(text())='Street Name']//parent::div//input",
      "Street Name input on registration page"
    );
    this.cityInput = this.locator(
      "//label[normalize-space(text())='City']//parent::div//input",
      "City input on registration page"
    );
    this.stateInput = this.locator(
      "//label[normalize-space(text())='State']//parent::div//input",
      "State input on registration page"
    );
    this.postalCodeInput = this.locator(
      "//label[normalize-space(text())='Postal Code']//parent::div//input",
      "Postal Code input on registration page"
    );

    // User Information Locators
    this.firstNameOfPrimaryContactInput = this.locator(
      "//label[normalize-space(text())='First Name of Primary Contact:']//parent::div//input",
      "First Name of Primary Contact input on registration page"
    );
    this.lastNameOfPrimaryContactInput = this.locator(
      "//label[normalize-space(text())='Last Name of Primary Contact:']//parent::div//input",
      "Last Name of Primary Contact input on registration page"
    );
    this.passwordInput = this.locator(
      "//label[normalize-space(text())='Password:']//parent::div//input",
      "Password input on registration page"
    );
    this.confirmPasswordInput = this.locator(
      "//label[normalize-space(text())='Confirm Password:']//parent::div//input",
      "Confirm Password input on registration page"
    );
    this.emailInput = this.locator(
      "//label[normalize-space(text())='Email:']//parent::div//input",
      "Email input on registration page"
    );
    this.iAcceptTermsConditionsCheckbox = this.locator(
      "input[title='I accept the Terms and Conditions']",
      "I accept the Terms and Conditions checkbox on registration page"
    );
    this.registerButton = this.locator(
      "input[value='Register']",
      "Register button on registration page"
    );

    this.unableToCreateUserErrorMessage = this.locator(
      "//div[normalize-space(text())='Unable to create user account at this time']",
      "Unable to create user error message on registration page"
    );
  }

  async clickUtilityCustomerWithAccountNumber() {
    await this.actions.click(this.utilityCustomerWithAccountNumberLink);
  }

  async clickUtilityCustomerWithoutAccountNumber() {
    await this.actions.click(this.utilityCustomerWithoutAccountNumberLink);
  }

  async clickTradeAllyContractor() {
    await this.actions.click(this.tradeAllyContractorLink);
  }

  async typeInAccountName(accountName: string) {
    await this.actions.type(this.accountNameInput, accountName);
  }

  async typeInAccountNumber(accountNumber: string) {
    await this.actions.type(this.accountNumberInput, accountNumber);
  }

  async typeInStreetNumber(streetNumber: string) {
    await this.actions.type(this.streetNumberInput, streetNumber);
  }

  async typeInStreetName(streetName: string) {
    await this.actions.type(this.streetNameInput, streetName);
  }

  async typeInCity(city: string) {
    await this.actions.type(this.cityInput, city);
  }

  async typeInState(state: string) {
    await this.actions.type(this.stateInput, state);
  }

  async typeInPostalCode(postalCode: string) {
    await this.actions.type(this.postalCodeInput, postalCode);
  }

  async typeInFirstNameOfPrimaryContact(firstName: string) {
    await this.actions.type(this.firstNameOfPrimaryContactInput, firstName);
  }

  async typeInLastNameOfPrimaryContact(lastName: string) {
    await this.actions.type(this.lastNameOfPrimaryContactInput, lastName);
  }

  async typeInPassword(password: string) {
    await this.actions.type(this.passwordInput, password);
  }

  async typeInConfirmPassword(confirmPassword: string) {
    await this.actions.type(this.confirmPasswordInput, confirmPassword);
  }

  async typeInEmail(email: string) {
    await this.actions.type(this.emailInput, email);
  }

  async checkIAcceptTermsConditions() {
    await this.actions.check(this.iAcceptTermsConditionsCheckbox);
  }

  async clickRegisterButton() {
    await this.actions.click(this.registerButton);
  }

  async verifyUnableToCreateUserErrorMessage() {
    await this.actions.verifyVisible(this.unableToCreateUserErrorMessage);
  }
}