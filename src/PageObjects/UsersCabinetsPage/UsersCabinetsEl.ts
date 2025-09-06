import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class UsersButtonsCabinet {
  readonly page: Page;
  readonly profileUser: Locator;
  readonly parentMyChilds: Locator;
  readonly wallet: Locator;
  readonly balanceWallet: Locator;
  readonly inputSummAddWalletForm: Locator;
  readonly buttonCardPayAddWalletForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileUser = page.locator("//button[contains(text(), 'Профиль')]"); // Кнопка раздела "Профиль (пользователя)"
    this.parentMyChilds = page.locator("//button[contains(text(), 'Мои дети')]"); // Кнопка раздела "Мои дети"
    this.wallet = page.locator("//button[contains(text(), 'Кошелек')]"); // Кнопка раздела "Кошелек"
    this.balanceWallet = page.locator("//button[contains(text(), 'Кошелек')] / div [2] /span"); // Баланс кошелька
    this.inputSummAddWalletForm = page.locator("//input[@class = 'ismart-z9kufr-TextField-input']"); // Инпут ввода суммы для пополнения кошелька
    this.buttonCardPayAddWalletForm = page.locator("//button[@class = 'ismart-1uu1353-Button-container']"); // Кнопка "Оплата картой" в форме пополнения кошелька
  }

  async clickProfileUser() {
    await allure.step(`Кабинет: Клик на '${await this.profileUser.textContent()}'`, async () => {
      await this.profileUser.click();
    });
  }

  async clickParentMyChilds() {
    await allure.step(`Кабинет: Клик на 'Мои дети'`, async () => {
      await this.parentMyChilds.click();
    });
  }

  async clickWallet() {
    await allure.step(`Кабинет: Клик на 'Кошелек'`, async () => {
      await this.wallet.click();
    });
  }

  async clickButtonCardPayAddWalletForm() {
    await allure.step(`Пополнение кошелька: Клик на 'Оплата картой'`, async () => {
      await this.buttonCardPayAddWalletForm.click();
    });
  }

  async textProfileUser() {
    await this.profileUser.waitFor();
    return await this.profileUser.textContent();
  }

  async textBalanceWallet() {
    await this.balanceWallet.waitFor();
    const balanceText = await this.balanceWallet.innerText();
    const number = balanceText.replace(/[\s\u00A0₽]/g, "").replace(",", ".");
    const balance = parseFloat(number);
    return balance;
  }

  async setValuesInputSummAddWalletForm(summ: string) {
    await allure.step(`Пополнение кошелька: Ввод суммы в инпут`, async () => {
      await this.inputSummAddWalletForm.waitFor();
      await this.inputSummAddWalletForm.clear();
      await this.inputSummAddWalletForm.fill(summ);
    });
  }
}
