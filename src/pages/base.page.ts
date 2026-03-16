import { Page } from "@playwright/test";
import { UIActions } from "../helpers/uiActions.helper";
import { QDriver } from "qdriver";
import { QDriverLocator } from "qdriver";
import { Locator } from "@playwright/test";

type LocatorLike = Locator | QDriverLocator;

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly actions: UIActions;
  protected readonly qd: QDriver;

  constructor(page: Page) {
    this.page = page;
    this.actions = new UIActions(page);
    this.qd = new QDriver(page);
  }

  protected locator(selector: string, description: string): LocatorLike {
    if (process.env.ENABLE_QDRIVER === "true") {
      return this.qd.locator(selector, description);
    }
    return this.page.locator(selector);
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async waitForUrl(url: RegExp | string) {
    await this.page.waitForURL(url);
  }

  async reload() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
