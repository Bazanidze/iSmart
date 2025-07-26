import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class Header {
  readonly page: Page;
  readonly profileMenuButton: Locator;
  readonly userProfile: Locator;
  readonly cabinetUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileMenuButton = page.locator("(//span[@class='ismart-1ca4ns0-Icon-container'])[1]"); // Кнопка расскрыть "Меню профиля"
    this.userProfile = page.locator("(//p[@class='ismart-ra9oc-Paragraph-container'])[1]"); // Название роли в хедере справа
    this.cabinetUser = page.locator("(//span[contains(text(), 'Кабинет')])[1]"); // Название кабинета пользователя в хедере
  }

  async clickProfileMenu() {
    await allure.step("iSmart Хедер: Клик на 'Меню профиля'", async () => {
      await this.profileMenuButton.click();
    });
  }

  async textUserProfile() {
    await this.userProfile.waitFor();
    return await this.userProfile.textContent();
  }

  async textСabinetUser() {
    await this.cabinetUser.waitFor();
    return await this.cabinetUser.textContent();
  }
}
