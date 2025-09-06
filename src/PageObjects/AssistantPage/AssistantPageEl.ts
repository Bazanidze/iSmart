import { Page, Locator, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class AssistantPageEl {
  readonly page: Page;
  readonly countQuestions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.countQuestions = page.locator("//span[@class = 'ismart-12tjath-Text-container']"); // Количество "Вопросов"
  }

  async getCountQuestions() {
    await this.countQuestions.waitFor({ state: "visible" });
    const text = await this.countQuestions.innerText();
    const countQuest = text.replace(/\D/g, "");
    return parseInt(countQuest);
  }
}
