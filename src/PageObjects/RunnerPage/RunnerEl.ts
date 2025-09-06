import { Page, Locator, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class RunnerEl {
  readonly page: Page;
  readonly open: Locator;
  readonly taskOpen: Locator;
  readonly progressScale: Locator;

  constructor(page: Page) {
    this.page = page;
    this.open = page.locator("//div[@class = 'ismart-znv8ce-Flexbox-container']"); // Блок, что раннер открыт
    this.taskOpen = page.locator("//div[@id='task_runner']"); // Задание раннера отображается
    this.progressScale = page.locator("//div[@class='ismart-82ccaz-Block-container']"); // Шкала прогресса в раннере
  }

  async waitOpen() {
    await this.open.waitFor({ state: "visible" });
  }

  async waitTaskOpen() {
    await this.taskOpen.waitFor({ state: "visible" });
  }

  async waitProgressScale() {
    await this.progressScale.waitFor({ state: "visible" });
  }
}
