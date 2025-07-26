import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class ValuesProfileMenu {
  readonly page: Page;
  readonly logORregisterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logORregisterButton = page.locator("//p[contains(text(), 'Войти или зарегистрироваться')]"); // Кнопка "Войти или зарегистрироваться" в меню профиля
  }

  async clickLogORregisterButton() {
    await allure.step(`iSmart меню профиля: Клик "Войти или зарегистрироваться"`, async () => {
      await this.logORregisterButton.click();
    });
  }
}
