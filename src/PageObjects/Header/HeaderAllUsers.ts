import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class Header {
  readonly page: Page;
  readonly profileMenuButton: Locator;
  readonly userProfile: Locator;
  readonly cabinetUser: Locator;
  readonly catalogTasks: Locator;
  readonly shop: Locator;
  readonly cart: Locator;
  readonly assistant: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileMenuButton = page.locator("(//span[@class='ismart-1ca4ns0-Icon-container'])[1]"); // Кнопка расскрыть "Меню профиля"
    this.userProfile = page.locator("(//p[@class='ismart-ra9oc-Paragraph-container'])[1]"); // Название роли в хедере справа
    this.cabinetUser = page.locator("(//span[contains(text(), 'Кабинет')])[1]"); // Название кабинета пользователя в хедере
    this.catalogTasks = page.locator("(//span[contains(text(), 'Каталог заданий')])[1]"); // Каталог заданий в хедере
    this.shop = page.locator("(//span[contains(text(), 'Магазин')])[1]"); // Магазин в хедере
    this.cart = page.locator("(//div[@class = 'ismart-10pr437-Flexbox-container'])[1]"); // Корзина в хедере
    this.assistant = page.locator("(//span[contains(text(), 'Помощник')])[1]"); // Помощник в хедере
  }

  async clickAssistant() {
    await allure.step("iSmart Хедер: Клик на 'Помощник'", async () => {
      await this.assistant.click();
    });
  }

  async clickСart() {
    await allure.step("iSmart Хедер: Клик на 'Корзину'", async () => {
      await this.cart.click();
    });
  }

  async clickShop() {
    await allure.step("iSmart Хедер: Клик на 'Магазин'", async () => {
      await this.shop.click();
    });
  }

  async clickProfileMenu() {
    await allure.step("iSmart Хедер: Клик на 'Меню профиля'", async () => {
      await this.profileMenuButton.click();
    });
  }

  async clickСatalogTasks() {
    await allure.step("iSmart Хедер: Клик на 'Каталог заданий'", async () => {
      await this.catalogTasks.waitFor({ state: "visible" });
      await this.catalogTasks.click();
    });
  }

  async clickСabinetUser() {
    await allure.step(`iSmart Хедер: Клик на '${await this.cabinetUser.textContent()}'`, async () => {
      await this.cabinetUser.click();
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

  async waitNameCabinetUser(nameUser: string) {
    this.page.locator(`(//span[contains(text(), 'Кабинет ${nameUser}')])[1]`).waitFor({ state: "visible" });
  }
}
