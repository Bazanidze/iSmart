import { Page } from "@playwright/test";
import { PaymentWindowPage } from "../../PageObjects/PaymaentWindowPage/PaymentWindowPage";
import { allure } from "allure-playwright";

export async function actionPay(page1: Page, numberCard: string, packageName = "") {
  await allure.step("Оплата покупки по карте (окно эквайринга)", async () => {
    const payWindow = new PaymentWindowPage(page1);
    let count = 0;
    if (packageName === "Package") {
      count = 3;
    } else {
      count = 4;
    }
    await payWindow.paymentWindow.windowPay.waitFor({ state: "visible" });
    await new Promise((r) => setTimeout(r, 4000));
    for (let i = 0; i < count; i++) {
      await page1.keyboard.press("Tab");
    }

    for (const key of numberCard) {
      await page1.keyboard.press(key);
    }

    await page1.keyboard.press("Tab");
    await page1.keyboard.press("Space");
    for (let i = 0; i <= 2; i++) {
      await page1.keyboard.press("Tab");
    }
    await page1.keyboard.press("Enter");
    await payWindow.paymentWindow.windowPay.waitFor({ state: "hidden" });
  });
}
