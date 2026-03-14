/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { QDriverLocator } from "qdriver";

export class LoginPage extends BasePage {
  readonly userNameInput: QDriverLocator;
  readonly passwordInput: QDriverLocator;
  readonly loginButton: QDriverLocator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = this.qd.locator(
      "[name='loginPage:j_id1:siteLogin:loginComponent:loginForm:username']",
      "Username input on login page"
    );
    this.passwordInput = this.qd.locator(
      "[name='loginPage:j_id1:siteLogin:loginComponent:loginForm:password']",
      "Password input on login page"
    );
    this.loginButton = this.qd.locator(
      "[name='loginPage:j_id1:siteLogin:loginComponent:loginForm:loginButton']",
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
    email: string = process.env.USEREMAIL!,
    password: string = process.env.PASSWORD!,
  ) {
    await this.goto();
    await this.signIn(email, password);
    await this.waitForUrl(/eo3__portalcustomerhome/);
  }
}
