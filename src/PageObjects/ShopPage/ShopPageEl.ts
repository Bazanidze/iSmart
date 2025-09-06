import { Page, Locator, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class ShopPageEl {
  readonly page: Page;
  readonly buttonBuyYearFullPackage: Locator;
  readonly buttonBuyFormPackage: Locator;
  readonly buttonCloseThankBuy: Locator;
  readonly itemYearFullPackage: Locator;
  readonly selectClassWait: Locator;
  readonly priceFullPackage: Locator;
  readonly buttonConfirmFormFullPackage: Locator;
  readonly buttonCartBuyTasks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonBuyYearFullPackage = page.locator("(//button[contains(text(), 'Купить на год')])[2]"); // Кнопка "Купить на год" годовой пакет "Полный"
    this.buttonBuyFormPackage = page.locator("//button[contains(text(), 'Оплатить ')]"); // Кнопка "Оплатить" в форме оформления покупки Пакета на год при покупке по карте
    this.buttonCloseThankBuy = page.locator("//button[contains(text(), 'Закрыть')]"); // Кнопка "Закрыть" в окне "Спасибо за вашу покупку"
    this.itemYearFullPackage = page.locator(
      "//div[@class = 'ismart-14isxhy-Flexbox-container']//div[@class = 'ismart-1vda7o8-Flexbox-container']//span"
    ); // Предметы входящие в покупку для годового пакета "Полный"
    this.selectClassWait = page.locator("//div[@class = 'ismart-qrfpmw-Flexbox-container']"); // Локатор для ожидания отображения выбора класса
    this.priceFullPackage = page.locator(
      "(//div[@class='ismart-1iajdht-Flexbox-container']//span[@class = 'ismart-1g758dp-Text-container'])[2]"
    ); // Стоимость годового пакета "Полный"
    this.buttonConfirmFormFullPackage = page.locator("//button[contains(text(), 'Подтвердить покупку')]"); // Кнопка "Подтвердить покупку" в форме оформления покупки Пакета на год при оплате со счета кошелька
    this.buttonCartBuyTasks = page.locator(
      "(//div[@class = 'ismart-bz0mlh-Flexbox-container']//button[contains(text(), 'В корзину')])[1]"
    ); // Кнопка "В корзину" при покупке количества заданий
  }

  async waitSelectClassWait() {
    await this.selectClassWait.waitFor({ state: "visible" });
  }

  async clickButtonCartBuyTasks() {
    await allure.step(`Магазин: Клик на кнопку "В корзину" при покупке количества заданий`, async () => {
      await this.buttonCartBuyTasks.click();
    });
  }

  async clickButtonConfirmFormFullPackage() {
    await allure.step(`Магазин: Клик на кнопку "Подтвердить покупку" годовой пакет`, async () => {
      await this.buttonConfirmFormFullPackage.click();
    });
  }

  async clickButtonCloseThankBuy() {
    await allure.step(`Магазин: Клик на кнопку "Закрыть" в окне "Спасибо за Вашу покупку"`, async () => {
      await this.buttonCloseThankBuy.click();
    });
  }

  async clickButtonBuyYearFullPackage() {
    await allure.step(`Магазин: Клик на кнопку "Купить на год" годовой пакет "Полный"`, async () => {
      await this.buttonBuyYearFullPackage.click();
    });
  }

  async clickButtonBuyFormPackage() {
    await allure.step(`Магазин окно "Оформление": Клик на кнопку "Оплатить ... " годовой пакет`, async () => {
      await this.buttonBuyFormPackage.click();
    });
  }

  async chooseClass(numberClass: string) {
    const button = await this.page.locator(`(//span[contains(text(), '${numberClass}')])[1]`);
    await allure.step(`Страница Магазина: Выбор класса "${numberClass}"`, async () => {
      await button.click(); // Выбираем класс на странице Магазина (клик по классу)
      await new Promise((r) => setTimeout(r, 1000));
    });
    return await this.page.locator(`(//span[contains(text(), '${numberClass}')])[1]/parent::div`);
  }

  async chooseButtonMonthItem(month: string) {
    const button = await this.page.locator(
      `(//div[@class = 'ismart-9jovsq-Flexbox-container']//button[contains(text(), '${month} месяц')])[1]`
    );
    await allure.step(`Страница Магазина: Выбор периода действия пакета "${month}" месяц(-ев)`, async () => {
      await button.click(); // Выбираем период действия пакета
      await new Promise((r) => setTimeout(r, 1000));
    });
    return button;
  }

  async chooseItemBuy(nameItem: string) {
    const button = await this.page.locator(
      `//div[@class = 'ismart-1vb4dhh-Grid-container']//span[contains(text(), '${nameItem}')]`
    );
    await allure.step(`Страница Магазина: Клик на предмет "${nameItem}" для добавления в корзину`, async () => {
      await button.click(); // Кликаем на предмет для добавления в корзину
      await new Promise((r) => setTimeout(r, 1000));
    });
    return button;
  }

  async chooseCountTasksBuy(count: string) {
    const button = await this.page.locator(
      `(//div[@class = 'ismart-bz0mlh-Flexbox-container']//span[contains(text(), '${count}')])[1]`
    );
    await allure.step(`Страница Магазина: Выбрано '${count}' заданий для добавления в корзину`, async () => {
      await button.click(); // Кликаем на количество заданий для добавления в корзину
      await new Promise((r) => setTimeout(r, 500));
    });
  }

  async textPriceFullPackage() {
    await this.priceFullPackage.waitFor();
    const priceText = await this.priceFullPackage.innerText();
    const price1 = priceText.replace(/\D/g, "");
    const price = parseFloat(price1);
    return price;
  }

  async getCountItemYearFullPackage() {
    const countItem = await this.itemYearFullPackage.count();
    return countItem - 1;
  }
}
