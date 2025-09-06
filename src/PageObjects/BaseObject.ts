import { Page } from "@playwright/test";
import { Header } from "./Header/HeaderAllUsers";
import { allure } from "allure-playwright";

import { ValuesProfileMenu } from "./ValuesProfileMenu/ProfileMenuAllUsers";
import { LogOrRegister } from "./FormLogOrRegistration/LogOrRegister";
import { FakeEmail } from "./FakeEmailPage/FakeEmailElem";
import { RamblerEl } from "./RamblerPage/Rambler";
import { HeaderLanding } from "./LandingPage/HeaderLanding";
import { UsersButtonsCabinet } from "./UsersCabinetsPage/UsersCabinetsEl";
import { ParentMyChilds } from "./UsersCabinetsPage/ParentCabinet";
import { StudentTasks } from "./UsersCabinetsPage/StudentCabinet";
import { PaymentWindow } from "./PaymaentWindowPage/PaymentWindowEl";
import { CatalogPageEl } from "./CatalogPage/CatalogPageEl";
import { ShopPageEl } from "./ShopPage/ShopPageEl";
import { CartEl } from "./Cart/CartEl";
import { AssistantPageEl } from "./AssistantPage/AssistantPageEl";
import { RunnerEl } from "./RunnerPage/RunnerEl";

export abstract class BasePage {
  protected readonly page: Page;
  public readonly header: Header;
  public readonly profileMenu: ValuesProfileMenu;
  public readonly formLogOrRegister: LogOrRegister;
  public readonly fakeEmailPage: FakeEmail;
  public readonly ramblerPageEl: RamblerEl;
  public readonly landingPageEl: HeaderLanding;
  public readonly usersCabinet: UsersButtonsCabinet;
  public readonly parentMyChild: ParentMyChilds;
  public readonly studentTasks: StudentTasks;
  public readonly paymentWindow: PaymentWindow;
  public readonly catalogPageEl: CatalogPageEl;
  public readonly shopPageEl: ShopPageEl;
  public readonly cartEl: CartEl;
  public readonly assistantPageEl: AssistantPageEl;
  public readonly runnerEl: RunnerEl;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.profileMenu = new ValuesProfileMenu(page);
    this.formLogOrRegister = new LogOrRegister(page);
    this.fakeEmailPage = new FakeEmail(page);
    this.ramblerPageEl = new RamblerEl(page);
    this.landingPageEl = new HeaderLanding(page);
    this.usersCabinet = new UsersButtonsCabinet(page);
    this.parentMyChild = new ParentMyChilds(page);
    this.studentTasks = new StudentTasks(page);
    this.paymentWindow = new PaymentWindow(page);
    this.catalogPageEl = new CatalogPageEl(page);
    this.shopPageEl = new ShopPageEl(page);
    this.cartEl = new CartEl(page);
    this.assistantPageEl = new AssistantPageEl(page);
    this.runnerEl = new RunnerEl(page);
  }

  async open(urlPath: string) {
    await allure.step(`Открытие страницы ${urlPath}`, async () => {
      await this.page.goto(urlPath, { waitUntil: "load" }); // domcontentloaded
    });
  }
}
