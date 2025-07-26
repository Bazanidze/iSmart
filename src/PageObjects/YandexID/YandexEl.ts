import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class LogOrRegister {
  readonly page: Page;
  readonly moreButton: Locator;
  readonly logLoginButton: Locator;
  readonly inputLogin: Locator;
  readonly logButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.moreButton = page.locator("//div[@class='passp-button passp-exp-register-button']"); // Кнопка "Ещё"
    this.logLoginButton = page.locator("//button[contains(text(), 'Войти ')]"); // Кнопка "Войти по логину"
    this.inputLogin = page.locator("//input[@name='login']"); // Инпут "Логин или email"
    this.logButton = page.locator("//button[@id='passp:sign-in']"); // Кнопка "Войти"
  }

  async setValueInputLogin(userName: string) {
    await allure.step(`Яндекс ID: Ввод "Логин или email" ${userName}`, async () => {
      await this.inputLogin.waitFor();
      await this.inputLogin.fill(userName);
    });
  }

  async clickMoreButton() {
    await allure.step(`Яндекс ID: Клик "Ещё"`, async () => {
      await this.moreButton.click();
    });
  }

  async clickLogLoginButton() {
    await allure.step(`Яндекс ID: Клик "Войти по логину"`, async () => {
      await this.logLoginButton.click();
    });
  }

  async clickLogButton() {
    await allure.step(`Яндекс ID: Клик "Войти"`, async () => {
      await this.logButton.click();
    });
  }
}
