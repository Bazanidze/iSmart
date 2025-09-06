import { Page } from "@playwright/test";
import { baseURL } from "../../../playwright.config";

export async function tokenEnv(page: Page, nextEnv: string, eduEnv: string) {
  const keyToken = "authToken";
  if (baseURL === "https://next.ismart.org/catalog/") {
    await page.context().addCookies([
      {
        name: keyToken,
        value: nextEnv,
        domain: ".next.ismart.org",
        path: "/",
      },
    ]);
  } else {
    await page.context().addCookies([
      {
        name: keyToken,
        value: eduEnv,
        domain: ".ismart.org",
        path: "/",
      },
    ]);
  }
}
