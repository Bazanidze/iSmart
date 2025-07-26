import { Page, chromium, Browser } from "@playwright/test";
import { allure } from "allure-playwright";

import { CatalogPage } from "../../PageObjects/CatalogPage/CatalogPage";
import { FakeEmailPage } from "../../PageObjects/FakeEmailPage/FakeEmailPage";
import { copyEmail, copyCodeSubmit } from "../FakeEmail/Actions_fake_email";
import { allURL, Email } from "../sitesEnv";
import { RamblerPage } from "../../PageObjects/RamblerPage/RamblerPage";
import { LandingPage } from "../../PageObjects/LandingPage/LandingPage";

export async function userAutorization(
  page: Page,
  userName: string,
  urlPath: string,
  methodAuthorize: string,
  password = "123456"
) {
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext({
    locale: "ru-RU",
  });

  const page1: Page = await context.newPage();
  const ramblerPage = new RamblerPage(page1);

  const page2: Page = await context.newPage();
  const catalogPage = new CatalogPage(page2);
  if (methodAuthorize === "По коду") {
    await ramblerPage.open(Email.ramblerMail);
    await ramblerPage.ramblerPageEl.setValueEmail(userName);
    await ramblerPage.ramblerPageEl.setValuePassword(password);
    await ramblerPage.ramblerPageEl.clickLogButton();
    await ramblerPage.ramblerPageEl.clickSubmitLaterButton();
    try {
      await allure.step("Почта Рамблер: Поиск входящих сообщений", async () => {
        await ramblerPage.ramblerPageEl.incomingMail.first().waitFor({ state: "visible", timeout: 3500 });
      });
      await allure.step("Почта Рамблер: Удаление сообщений", async () => {
        await ramblerPage.ramblerPageEl.clickCheckBoxAllMessage();
        await ramblerPage.ramblerPageEl.clickDeleteEmail();
      });
    } catch (e) {
      await allure.step("Почта Рамблер: Входящих сообщений нет", async () => {});
    }

    await catalogPage.open(urlPath);
    if (urlPath === "https://ismart.org/" || urlPath === "https://web.next.ismart.org/") {
      await catalogPage.landingPageEl.clickLogOrRegisterButton();
      await catalogPage.formLogOrRegister.clickCheckboxPoliticsButtonLanding();
    } else {
      await catalogPage.header.clickProfileMenu();
      await catalogPage.profileMenu.clickLogORregisterButton();
      await catalogPage.formLogOrRegister.clickСheckboxPoliticsButton();
    }

    await catalogPage.formLogOrRegister.setValueEmailOrLogin(userName);
    await catalogPage.formLogOrRegister.clickNextButton();

    await ramblerPage.ramblerPageEl.clickIncomingMail();
    const code = await ramblerPage.ramblerPageEl.textСodeSubmit();
    await ramblerPage.ramblerPageEl.clickDeleteEmail();
    await catalogPage.formLogOrRegister.setValuePasswordInput(code);
    await catalogPage.formLogOrRegister.clickLogButton();

    return { page: page2, browser, context };
  } else if (methodAuthorize === "По ссылке") {
    await ramblerPage.open(Email.ramblerMail);
    await ramblerPage.ramblerPageEl.setValueEmail(userName);
    await ramblerPage.ramblerPageEl.setValuePassword(password);
    await ramblerPage.ramblerPageEl.clickLogButton();
    await ramblerPage.ramblerPageEl.clickSubmitLaterButton();

    try {
      await allure.step("Почта Рамблер: Поиск входящих сообщений", async () => {
        await ramblerPage.ramblerPageEl.incomingMail.first().waitFor({ state: "visible", timeout: 3500 });
      });
      await allure.step("Почта Рамблер: Удаление сообщений", async () => {
        await ramblerPage.ramblerPageEl.clickCheckBoxAllMessage();
        await ramblerPage.ramblerPageEl.clickDeleteEmail();
      });
    } catch (e) {
      await allure.step("Почта Рамблер: Входящих сообщений нет", async () => {});
    }

    await catalogPage.open(urlPath);
    if (urlPath === "https://ismart.org/" || urlPath === "https://web.next.ismart.org/") {
      await catalogPage.landingPageEl.clickLogOrRegisterButton();
      await catalogPage.formLogOrRegister.clickCheckboxPoliticsButtonLanding();
    } else {
      await catalogPage.header.clickProfileMenu();
      await catalogPage.profileMenu.clickLogORregisterButton();
      await catalogPage.formLogOrRegister.clickСheckboxPoliticsButton();
    }
    await catalogPage.formLogOrRegister.setValueEmailOrLogin(userName);
    await catalogPage.formLogOrRegister.clickNextButton();
    await ramblerPage.ramblerPageEl.clickIncomingMail();
    await ramblerPage.ramblerPageEl.clickLinkUrl();

    const newPage = await context.waitForEvent("page");
    await newPage.bringToFront();
    await ramblerPage.ramblerPageEl.clickDeleteEmail();
    return { page: newPage, browser, context };
  } else {
    await catalogPage.open(urlPath);
    if (urlPath === "https://ismart.org/" || urlPath === "https://web.next.ismart.org/") {
      await catalogPage.landingPageEl.clickLogOrRegisterButton();
      await catalogPage.formLogOrRegister.clickCheckboxPoliticsButtonLanding();
    } else {
      await catalogPage.header.clickProfileMenu();
      await catalogPage.profileMenu.clickLogORregisterButton();
      await catalogPage.formLogOrRegister.clickСheckboxPoliticsButton();
    }
    await catalogPage.formLogOrRegister.setValueEmailOrLogin(userName);

    await catalogPage.formLogOrRegister.clickNextButton();
    await catalogPage.formLogOrRegister.setValuePasswordInput(password);
    await catalogPage.formLogOrRegister.clickLogButton();
    return { page: page2, browser, context };
  }
}

export async function userRegister(page: Page, urlPath: string, userRole: string, methodRegister: string) {
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext();

  const page1: Page = await context.newPage();
  const fakeEmail = new FakeEmailPage(page1);
  await fakeEmail.open(Email.virtualEmail);
  const nameEmail = await copyEmail(page1);

  const page2: Page = await context.newPage();
  const catalogPage = new CatalogPage(page2);
  await catalogPage.open(urlPath);

  await catalogPage.header.clickProfileMenu();
  await catalogPage.profileMenu.clickLogORregisterButton();
  await catalogPage.formLogOrRegister.setValueEmailOrLogin(nameEmail);
  await catalogPage.formLogOrRegister.clickСheckboxPoliticsButton();
  await catalogPage.formLogOrRegister.clickNextButton();
  await fakeEmail.fakeEmailPage.clickIncomingMessageButton();
  if (methodRegister === "По коду") {
    const codeSubmit = await copyCodeSubmit(page1);
    await catalogPage.formLogOrRegister.setValuePasswordInput(codeSubmit);
    await catalogPage.formLogOrRegister.clickLogButton();
    await catalogPage.formLogOrRegister.changeRole(userRole).click();
    await catalogPage.formLogOrRegister.clickСontinueButton();
    return { page: page2, browser, context };
  } else {
    await fakeEmail.fakeEmailPage.clickLinkUrl();
    const newPage = await context.waitForEvent("page");
    await newPage.bringToFront();
    const newCatalogPage = new CatalogPage(newPage);
    await newCatalogPage.formLogOrRegister.changeRole(userRole).click();
    await newCatalogPage.formLogOrRegister.clickСontinueButton();
    return { page: newPage, browser, context };
  }
}
