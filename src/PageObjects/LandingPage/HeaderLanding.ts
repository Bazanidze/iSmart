import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class HeaderLanding {
  readonly page: Page;
  readonly mainPage: Locator;
  readonly logOrRegisterButton: Locator;
  readonly userProfile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainPage = page.locator("(//span[contains(text(), 'Главная')])[1]"); // Кнопка "Главная"
    this.logOrRegisterButton = page.locator("(//button[contains(text(), 'Вход или регистрация')])[3]"); // Кнопка "Вход или регистрация"
    this.userProfile = page.locator("(//p[@class = 'stage-1qkbjjj-Paragraph-container'])[2]"); // Название роли в хедере справа (//div[@class = 'stage-1g52oh-Block-container']) [1] (//p[@class = 'stage-1qkbjjj-Paragraph-container'])[1]
  }

  async clickLogOrRegisterButton() {
    await allure.step("iSmart Лэндинг: Клик на 'Вход или регистрация'", async () => {
      await this.logOrRegisterButton.click();
    });
  }

  async textUserProfile() {
    await this.userProfile.waitFor();
    return await this.userProfile.textContent();
  }
}
