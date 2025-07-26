import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class FakeEmail {
  readonly page: Page;
  readonly changeButton: Locator;
  readonly copyEmailButton: Locator;
  readonly inputEmail: Locator;
  readonly codeSubmit: Locator;
  readonly incomingMessageButton: Locator;
  readonly linkUrl: Locator;

  constructor(page: Page) {
    this.page = page;
    this.changeButton = page.locator("//p[contains(text(), 'Изменять')]/ancestor::button"); // Кнопка изменить почту
    this.copyEmailButton = page.locator("//div[@class='text-base font-bold grow truncate']"); // Кнопка скопировать Email
    this.inputEmail = page.locator("//div[@class='text-base font-bold grow truncate']"); // Инпут с Email
    this.codeSubmit = page.locator("//strong[contains(text(), 'Код подтверждения:')]"); // Код подтверждения из письма
    this.incomingMessageButton = page.locator("//div[@class = 'p-2']"); // Входящее сообщение
    this.linkUrl = page.locator("//a[contains(text(), 'ссылке')]"); // Ссылка в письме
  }

  async clickChangeButton() {
    await allure.step("FakeEmail: Клик на 'Изменить'", async () => {
      await this.changeButton.click();
    });
  }

  async clickCopyEmailButton() {
    await allure.step("FakeEmail: Клик на 'Скопировать Email'", async () => {
      await this.copyEmailButton.click();
    });
  }

  async textInputEmail(): Promise<string> {
    await this.inputEmail.waitFor();
    return await this.inputEmail.innerText();
  }

  async textСodeSubmit(): Promise<string> {
    await allure.step(`FakeEmail: получение кода`, async () => {
      await this.codeSubmit.waitFor();
    });
    const text = await this.codeSubmit.innerText();
    const code = text.match(/Код подтверждения[:\s]*([\d]+)/i);
    return code ? code[1] : "";
  }

  async clickIncomingMessageButton() {
    await allure.step("FakeEmail: Клик на входящее сообщение", async () => {
      await this.incomingMessageButton.click();
    });
  }

  async clickLinkUrl() {
    await allure.step("FakeEmail: Клик на ссылку", async () => {
      await this.linkUrl.click();
    });
  }
}
