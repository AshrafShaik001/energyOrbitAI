/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Locator, Page, expect } from "@playwright/test";
import { QDriverLocator } from "qdriver";

type LocatorLike = Locator | QDriverLocator;

export class UIActions {
  constructor(private page: Page) {}

  
  private async resolve(element: LocatorLike): Promise<Locator> {
    return "native" in element ? element.native() : element;
  }

  async click(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeVisible();
    await expect(loc).toBeEnabled();
    await loc.click();
  }

  async doubleClick(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeVisible();
    await loc.dblclick();
  }

  async rightClick(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeVisible();
    await loc.click({ button: "right" });
  }

  async hover(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeVisible();
    await loc.hover();
  }

  async type(element: LocatorLike, value: string) {
    const loc = await this.resolve(element);
    await expect(loc).toBeEnabled();
    await loc.clear();
    await loc.fill(value);
    await expect(loc).toHaveValue(value);
  }

  async typeWithoutClearing(element: LocatorLike, value: string) {
    const loc = await this.resolve(element);
    await expect(loc).toBeEnabled();
    await loc.type(value);

    const currentValue = await loc.inputValue();
    expect(currentValue).toContain(value);
  }

  async clear(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeEnabled();
    await loc.clear();
    await expect(loc).toHaveValue("");
  }

  async check(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeVisible();
    await loc.check();
    await expect(loc).toBeChecked();
  }

  async uncheck(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeVisible();
    await loc.uncheck();
    await expect(loc).not.toBeChecked();
  }

  async selectByValue(element: LocatorLike, value: string) {
    const loc = await this.resolve(element);
    await loc.selectOption(value);
    await expect(loc).toHaveValue(value);
  }

  async selectByLabel(element: LocatorLike, label: string) {
    const loc = await this.resolve(element);
    await loc.selectOption({ label });
  }

  async getText(element: LocatorLike): Promise<string> {
    const loc = await this.resolve(element);
    await expect(loc).toBeVisible();
    return (await loc.textContent()) ?? "";
  }

  async verifyText(element: LocatorLike, expected: string) {
    const loc = await this.resolve(element);
    await expect(loc).toHaveText(expected);
  }

  async verifyContainsText(element: LocatorLike, partial: string) {
    const loc = await this.resolve(element);
    await expect(loc).toContainText(partial);
  }

  async verifyValue(element: LocatorLike, expected: string) {
    const loc = await this.resolve(element);
    await expect(loc).toHaveValue(expected);
  }

  async verifyVisible(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeVisible();
  }

  async verifyHidden(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeHidden();
  }

  async verifyEnabled(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeEnabled();
  }

  async verifyDisabled(element: LocatorLike) {
    const loc = await this.resolve(element);
    await expect(loc).toBeDisabled();
  }

  async waitForVisible(element: LocatorLike) {
    const loc = await this.resolve(element);
    await loc.waitFor({ state: "visible" });
  }

  async waitForHidden(element: LocatorLike) {
    const loc = await this.resolve(element);
    await loc.waitFor({ state: "hidden" });
  }

  async waitForURL(url: RegExp | string) {
    await this.page.waitForURL(url);
  }

  async waitForLoad() {
    await this.page.waitForLoadState("load");
  }

  async scrollIntoView(element: LocatorLike) {
    const loc = await this.resolve(element);
    await loc.scrollIntoViewIfNeeded();
  }

  async pressKey(element: LocatorLike, key: string) {
    const loc = await this.resolve(element);
    await loc.press(key);
  }

  async pressOnPage(key: string) {
    await this.page.keyboard.press(key);
  }

  async uploadFile(element: LocatorLike, filePath: string) {
    const loc = await this.resolve(element);
    await loc.setInputFiles(filePath);
  }
}
