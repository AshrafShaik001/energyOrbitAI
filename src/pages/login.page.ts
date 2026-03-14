import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Locator } from "@playwright/test";
import { QDriverLocator } from "qdriver";

type LocatorLike = Locator | QDriverLocator;

export class LoginPage extends BasePage {
  readonly userNameInput: LocatorLike;
  readonly passwordInput: LocatorLike;
  readonly loginButton: LocatorLike;

  constructor(page: Page) {
    super(page);
    this.userNameInput = this.locator(
      "[name='loginPage:j_id1:steLogin:loginComponent:loginForm:username']",
      "Username input on login page"
    );
    this.passwordInput = this.locator(
      "[name='loginPage:j_id1:steLogin:loginComponent:loginForm:password']",
      "Password input on login page"
    );
    this.loginButton = this.locator(
      "[name='loginPage:j_id1:steLogin:loginComponent:loginForm:loginButton']",
      "Login button"
    );
  }

  async goto() {
    await this.navigate("/eo3__SiteLogin");
  }

  async signIn(username: string, password: string) {
    await this.actions.type(this.userNameInput, username);
    await this.actions.type(this.passwordInput, password);
    await this.actions.click(this.loginButton);
  }

  async signInWith(
    email: string = process.env.EMAIL!,
    password: string = process.env.PASSWORD!,
  ) {
    await this.goto();
    await this.signIn(email, password);
    await this.waitForUrl(/eo3__portalcustomerhome/);
  }
}
