import { Page, Locator, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class CartEl {
  readonly page: Page;
  readonly buttonPay: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonPay = page.locator("//button[contains(text(), 'Оплатить')]"); // Кнопка "Оплатить"
    this.totalPrice = page.locator("//span[contains(text(), 'Всего')]/following-sibling::div/span"); // Цена "Всего"
  }

  async clickButtonPay() {
    await allure.step(`Корзина: Клик на кнопку "Оплатить ..."`, async () => {
      await this.buttonPay.waitFor({ state: "visible" });
      await this.buttonPay.click();
    });
  }

  async textTotalPrice() {
    await this.totalPrice.waitFor();
    const priceText = await this.totalPrice.innerText();
    const price1 = priceText.replace(/\D/g, "");
    const price = parseFloat(price1);
    return price;
  }
}
