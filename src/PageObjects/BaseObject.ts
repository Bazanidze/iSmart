import { Page } from "@playwright/test";
import { Header } from "./Header/HeaderAllUsers";
import { allure } from "allure-playwright";

import { ValuesProfileMenu } from "./ValuesProfileMenu/ProfileMenuAllUsers";
import { LogOrRegister } from "./FormLogOrRegistration/LogOrRegister";
import { FakeEmail } from "./FakeEmailPage/FakeEmailElem";
import { RamblerEl } from "./RamblerPage/Rambler";
import { HeaderLanding } from "./LandingPage/HeaderLanding";

export abstract class BasePage {
  protected readonly page: Page;
  public readonly header: Header;
  public readonly profileMenu: ValuesProfileMenu;
  public readonly formLogOrRegister: LogOrRegister;
  public readonly fakeEmailPage: FakeEmail;
  public readonly ramblerPageEl: RamblerEl;
  public readonly landingPageEl: HeaderLanding;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.profileMenu = new ValuesProfileMenu(page);
    this.formLogOrRegister = new LogOrRegister(page);
    this.fakeEmailPage = new FakeEmail(page);
    this.ramblerPageEl = new RamblerEl(page);
    this.landingPageEl = new HeaderLanding(page);
  }

  async open(urlPath: string) {
    await allure.step(`Открытие страницы ${urlPath}`, async () => {
      await this.page.goto(urlPath, { waitUntil: "domcontentloaded", timeout: 5000 });
    });
  }
}
