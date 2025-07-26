import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const namespace = process.env.NAMESPACE || "edu";
export const baseURL = `https://${namespace}.ismart.org/catalog/`;

export default defineConfig({
  testDir: "./tests", // Папка с тестами
  timeout: 35000,
  retries: 0,
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: false,
        // Важно!
        disableWebdriverStepsReporting: true, // отключает автологирование шагов
      },
    ],
  ],
  fullyParallel: true,
  workers: 1,
  use: {
    baseURL,
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
  },
  // projects: [
  //   { name: "Chromium", use: { ...devices["Desktop Chrome"] } },
  //   { name: "Firefox", use: { ...devices["Desktop Firefox"] } },
  // { name: "WebKit", use: { ...devices["Desktop Safari"] } }, // Сафари не надо расскоментировать
  // ],
});
