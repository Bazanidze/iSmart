import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class PaymentWindow {
  readonly page: Page;
  readonly inputNumberCard: Locator;
  readonly checkboxSaveCard: Locator;
  readonly buttonPay: Locator;
  readonly windowPay: Locator;
  readonly numberCardDiv: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputNumberCard = page.locator("//input[@automation-id='tui-input-card-group__card']"); // Инпут для ввода номера карты
    this.checkboxSaveCard = page.locator("//input[@automation-id='card-form__save-card-checkbox']"); // Чекбокс "Сохранить карту"
    this.buttonPay = page.locator("//button[@automation-id='card-form__submit']"); // Кнопка "Оплатить"
    this.windowPay = page.locator("//iframe[@id='payframe']"); // Всё окно оплаты
    this.numberCardDiv = page.locator("//div[@class= 'tui-form__row']"); // Блок через который сам инпут открывается для ввода (по другому инпут не открывается)
  }

  async clickСheckboxSaveCard() {
    await allure.step("Окно оплаты Т-банк: Ввод номера карты", async () => {
      await this.checkboxSaveCard.click();
    });
  }

  async clickButtonPay() {
    await allure.step("Окно оплаты Т-банк: Клик на кнопку 'Оплатить'", async () => {
      await this.buttonPay.click();
    });
  }

  async clickNumberCardDiv() {
    await this.numberCardDiv.waitFor({ state: "visible" });
    await this.numberCardDiv.click();
  }

  async setValuesInputNumberCard(numberCard: string) {
    await allure.step(`Окно оплаты Т-банк: Ввод номера карты: ${numberCard}`, async () => {
      await this.inputNumberCard.waitFor();
      await this.inputNumberCard.clear();
      await this.inputNumberCard.fill(numberCard);
    });
  }
}
