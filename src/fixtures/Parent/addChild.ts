import { Page, chromium, Browser } from "@playwright/test";
import { allure } from "allure-playwright";

import { UsersCabinetsPage } from "../../PageObjects/UsersCabinetsPage/UsersCabinetsPage";

export async function addChild(page: Page, name: string) {
  const cabinetUser = new UsersCabinetsPage(page);
  cabinetUser.parentMyChild.setValueInputName(name);
  cabinetUser.parentMyChild.clickAddButtonForm();
  await new Promise((r) => setTimeout(r, 2000));
}
