import { Page } from "@playwright/test";

export class NavigationHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto("/eo3__SiteLogin");
  }
}
