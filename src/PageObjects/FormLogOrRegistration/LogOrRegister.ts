import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class LogOrRegister {
  readonly page: Page;
  readonly emailOrLoginInput: Locator;
  readonly nextButton: Locator;
  readonly passwordInput: Locator;
  readonly logButton: Locator;
  readonly changeTeacher: Locator;
  readonly changeIndepStudent: Locator;
  readonly changeParent: Locator;
  readonly continueButton: Locator;
  readonly yandexIDButton: Locator;
  readonly checkboxPoliticsButton: Locator;
  readonly checkboxPoliticsButtonLanding: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailOrLoginInput = page.locator("//input[contains(@placeholder, 'Email или логин')]"); // Инпут для ввода email или логин
    this.nextButton = page.locator("//button[contains(text(), 'Далее')]"); // Кнопка далее
    this.passwordInput = page.locator("//input[@type='password']"); // Инпут для пароля
    this.logButton = page.locator("//button[contains(text(), 'Войти')]"); // Кнопка Войти
    this.changeTeacher = page.locator("//span[contains(text(), 'Школьный учитель')]"); // Кнопка школьный учитель при выборе роли
    this.changeIndepStudent = page.locator("//span[contains(text(), 'Самостоятельный ученик')]"); // Кнопка самостоятельный ученик при выборе роли
    this.changeParent = page.locator("//span[contains(text(), 'Родитель + ребенок')]"); // Кнопка родитель при выборе роли
    this.continueButton = page.locator("button.ismart-6ixos5-Button-container"); // Кнопка "Продолжить как ..."
    this.yandexIDButton = page.locator("//button[@class = 'ismart-fexrw-Button-container']"); // Кнопка "Продолжить с Яндекс ID"
    this.checkboxPoliticsButton = page.locator("(//div[@class = 'ismart-13gcnlm-Checkbox-check'])[1]"); // Чекбокс согласия с политикой конфиденциальности на странице каталога
    this.checkboxPoliticsButtonLanding = page.locator("(//div[@class = 'stage-1vek7es-Checkbox-check'])[1]"); // Чекбокс согласия с политикой конфиденциальности на странице каталога
  }

  async setValueEmailOrLogin(userName: string) {
    await allure.step(`iSmart форма: Ввод email или логин: ${userName}`, async () => {
      await this.emailOrLoginInput.waitFor();
      await this.emailOrLoginInput.fill(userName);
    });
  }

  async clickNextButton() {
    await allure.step(`iSmart форма: Клик "Далее"`, async () => {
      await this.nextButton.click();
    });
  }

  async setValuePasswordInput(password: string) {
    await allure.step(`iSmart форма: Ввод пароля: ${password}`, async () => {
      await this.passwordInput.waitFor();
      await this.passwordInput.fill(password);
    });
  }

  async clickLogButton() {
    await allure.step(`iSmart форма: Клик "Войти"`, async () => {
      await this.logButton.click();
    });
  }

  async clickСhangeTeacher() {
    await allure.step(`iSmart форма: Клик на выбор роли "Учитель"`, async () => {
      await this.changeTeacher.click();
    });
  }

  async clickСhangeIndepStudent() {
    await allure.step(`iSmart форма: Клик на выбор роли "Самостоятельный ученик"`, async () => {
      await this.changeIndepStudent.click();
    });
  }

  async clickСhangeParent() {
    await allure.step(`iSmart форма: Клик на выбор роли "Родитель + ребенок"`, async () => {
      await this.changeParent.click();
    });
  }

  async clickСontinueButton() {
    await allure.step(`iSmart форма: Клик "Продолжить как ..."`, async () => {
      await this.continueButton.click();
    });
  }

  async clickYandexIDButton() {
    await allure.step(`iSmart форма: Клик "Продолжить с Яндекс ID"`, async () => {
      await this.yandexIDButton.click();
    });
  }
  async clickСheckboxPoliticsButton() {
    await allure.step(`iSmart форма: Клик чекбокс "Согласие с политикой конфиденциальности`, async () => {
      await this.checkboxPoliticsButton.click();
    });
  }

  async clickCheckboxPoliticsButtonLanding() {
    await allure.step(`iSmart форма Лэндинг: Клик чекбокс "Согласие с политикой конфиденциальности`, async () => {
      await this.checkboxPoliticsButtonLanding.click();
    });
  }

  // Изменяемый локатор для выбора роли после регистрации
  changeRole(userRole: string): Locator {
    if (userRole === "Учитель") {
      return this.page.locator(
        `(//div[@class='ismart-iixdn1-Flexbox-container']/div[@class='ismart-nswrm6-Block-container'])[3]`
      );
    }
    if (userRole === "Самостоятельный ученик") {
      return this.page.locator(
        `(//div[@class='ismart-iixdn1-Flexbox-container']/div[@class='ismart-nswrm6-Block-container'])[2]`
      );
    }
    if (userRole === "Родитель + ребенок") {
      return this.page.locator(
        `(//div[@class='ismart-iixdn1-Flexbox-container']/div[@class='ismart-nswrm6-Block-container'])[1]`
      );
    }
    throw new Error(`Неизвестная роль: ${userRole}`);
  }
}
