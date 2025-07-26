import { Page } from "@playwright/test";
import { FakeEmailPage } from "../../PageObjects/FakeEmailPage/FakeEmailPage";

export async function copyEmail(page1: Page) {
  const fakeEmail = new FakeEmailPage(page1);
  //   await fakeEmail.fakeEmailPage.clickChangeButton();
  const nameFakeEmail = await fakeEmail.fakeEmailPage.textInputEmail();
  return nameFakeEmail;
}

export async function copyCodeSubmit(page1: Page) {
  const fakeEmail = new FakeEmailPage(page1);

  const nameFakeEmail = await fakeEmail.fakeEmailPage.textСodeSubmit();
  return nameFakeEmail;
}
