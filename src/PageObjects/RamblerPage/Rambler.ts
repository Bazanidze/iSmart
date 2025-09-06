import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class RamblerEl {
  readonly page: Page;
  readonly logButton: Locator;
  readonly inputMail: Locator;
  readonly inputPassword: Locator;
  readonly incomingMail: Locator;
  readonly codeSubmit: Locator;
  readonly submitLaterButton: Locator;
  readonly deleteEmail: Locator;
  readonly linkUrl: Locator;
  readonly checkBoxAllMessage: Locator;
  readonly buttonCloseSberID: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logButton = page.locator("//button[@type='submit']"); // Кнопка "Войти"
    this.inputMail = page.locator("#login"); // Инпут для ввода "Почта"
    this.inputPassword = page.locator("#password"); // Инпут Пароля
    this.submitLaterButton = page.locator("//button[contains(text(), 'Подтвердить позже')]"); // Инпут Пароля
    this.incomingMail = page.locator("//div[@class='ListItem-text-3k']"); // Входящее сообщение
    this.codeSubmit = page.locator("//strong[contains(text(), 'Код подтверждения:')]"); // Код подтверждения из письма
    this.deleteEmail = page.locator("(//div[@class='ToolbarButton-root-1B'])[1]"); // Удаление письма
    this.linkUrl = page.locator("//a[contains(text(), 'ссылке')]"); // Ссылка в письме
    this.checkBoxAllMessage = page.locator("//div[@class='MailListCheckMenu-flex-Bj']/span"); // Чекбокс для выбора всех писем
    this.buttonCloseSberID = page.locator("div.styles-close-33"); // Кнопка "Закрыть", всплывающее окно Сбер ID
  }

  async clickButtonCloseSberID() {
    await allure.step("Почта Рамблер: Клик 'Закрыть', всплывающее окно Сбер ID", async () => {
      await this.buttonCloseSberID.click();
    });
  }

  async clickLogButton() {
    await allure.step("Почта Рамблер: Клик 'Войти'", async () => {
      await this.logButton.click();
    });
  }

  async clickSubmitLaterButton() {
    await allure.step("Почта Рамблер: Клик 'Подтвердить позже'", async () => {
      await this.submitLaterButton.waitFor({ state: "visible" });
      await this.submitLaterButton.click();
    });
  }

  async clickIncomingMail() {
    await allure.step("Почта Рамблер: Клик 'Входящее сообщение'", async () => {
      await this.incomingMail.waitFor();
      await this.incomingMail.click();
    });
  }

  async clickDeleteEmail() {
    await allure.step("Почта Рамблер: Клик 'Удалить сообщение'", async () => {
      await this.deleteEmail.click();
    });
  }

  async clickLinkUrl() {
    await allure.step("Почта Рамблер: Клик на ссылку", async () => {
      await this.linkUrl.waitFor();
      await this.linkUrl.click();
    });
  }

  async clickCheckBoxAllMessage() {
    await allure.step("Почта Рамблер: Клик 'Чекбокс' все сообщения", async () => {
      await this.checkBoxAllMessage.click();
    });
  }

  async setValueEmail(email: string) {
    await allure.step(`Почта Рамблер: Ввод email: ${email}`, async () => {
      await this.inputMail.waitFor({ state: "visible" });
      await this.inputMail.fill(email);
    });
  }

  async setValuePassword(password: string) {
    await allure.step(`Почта Рамблер: Ввод пароля: ${password}`, async () => {
      await this.inputPassword.waitFor({ state: "visible" });
      await this.inputPassword.fill(password);
    });
  }

  async textСodeSubmit(): Promise<string> {
    await allure.step(`Почта Рамблер: получение кода`, async () => {
      await this.codeSubmit.waitFor();
    });
    const text = await this.codeSubmit.innerText();
    const code = text.match(/Код подтверждения[:\s]*([\d]+)/i);
    return code ? code[1] : "";
  }
}
