import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Locator } from "@playwright/test";
import { QDriverLocator } from "qdriver";

type LocatorLike = Locator | QDriverLocator;

export class HeaderPage extends BasePage {
  readonly registerLink: LocatorLike;

  constructor(page: Page) {
    super(page);
    this.registerLink = this.locator(
      "div#btnRegister a",
      "Register link in header"
    );
  }

  async clickRegisterLink() {
    await this.actions.click(this.registerLink);
  }
  
}