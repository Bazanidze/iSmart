import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class StudentTasks {
  readonly page: Page;
  readonly nameStudentCabinet: Locator;
  readonly parentCabinetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameStudentCabinet = page.locator(`(//div[@class ='ismart-iixdn1-Flexbox-container']/span)[13]`); // Имя ученика рядом рядом с аватаркой
    this.parentCabinetButton = page.locator(`//button[contains(text(), 'В кабинет родителя')]`); // Кнопка "В кабинет родителя" под аватаркой
  }

  async textNameStudentCabinet() {
    await this.nameStudentCabinet.waitFor({ state: "visible" });
    return await this.nameStudentCabinet.textContent();
  }

  async clickParentCabinetButton() {
    await this.parentCabinetButton.waitFor({ state: "visible" });
    await this.parentCabinetButton.click();
  }

  async waitParentCabinetButton() {
    await this.parentCabinetButton.waitFor({ state: "visible" });
  }
}
