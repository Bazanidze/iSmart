import { Page } from "@playwright/test";

export async function checkResponseStatus(page: Page, url: string) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  // Ждём появления нужного элемента

  return page.locator('//div[@data-test-id="SubThemesList"]');
}
