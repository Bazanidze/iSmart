import { BasePage } from "../BaseObject";
import { allure } from "allure-playwright";

export class RamblerPage extends BasePage {
  async open(urlPath: string) {
    super.open(urlPath);
  }
}
