import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

import { allEors } from "../../src/fixtures/dataEORS";
import { checkResponseStatus } from "../../src/fixtures/EORS/responseStatus";

test.describe("Checking the availability of websites", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzM0MWIyYjkyYzdhNWZiYWZlYjYwNyIsImlzQWN0aXZlIjp0cnVlLCJpc0d1ZXN0IjpmYWxzZSwiaXNSZWdpc3RyYXRpb25Db21wbGV0ZSI6dHJ1ZSwiaXNDb25maXJtRW1haWwiOmZhbHNlLCJzdHVkZW50cyI6W10sInV0Y09mZnNldCI6MTgwLCJyb2xlIjoic2Nob29sLXRlYWNoZXIiLCJsYXN0TmFtZSI6IiIsImZpcnN0TmFtZSI6ItCf0YDQvtGE0LXRgdGB0LjQvtC90LDQu9GM0L3Ri9C5IiwicGhvbmVOdW1iZXIiOiIiLCJsb2dpbiI6InRlYWNoZXJfZnVsbEBpc21hcnQub3JnIiwiZW1haWwiOiJ0ZWFjaGVyX2Z1bGxAaXNtYXJ0Lm9yZyIsImNvbnRyYWN0VHlwZSI6InByaXZhdGUiLCJleHRlcm5hbFVzZXJTb3VyY2UiOm51bGwsImdvZE1vZGUiOnRydWUsImVkdWNvbnQiOnt9LCJfaWQiOiI2NWMzNDFiMmI5MmM3YTVmYmFmZWI2MDcifQ.g8I_2Btv7rGXWFT_jbBB9c0iAVhZshRxVIA8nbNqh0s.eyJpZCI6IjY1YzM0MWIyYjkyYzdhNWZiYWZlYjYwNyIsImlzQWN0aXZlIjp0cnVlLCJpc0d1ZXN0IjpmYWxzZSwiaXNSZWdpc3RyYXRpb25Db21wbGV0ZSI6dHJ1ZSwiaXNDb25maXJtRW1haWwiOmZhbHNlLCJzdHVkZW50cyI6W10sInV0Y09mZnNldCI6MTgwLCJyb2xlIjoic2Nob29sLXRlYWNoZXIiLCJsYXN0TmFtZSI6IiIsImZpcnN0TmFtZSI6ItCf0YDQvtGE0LXRgdGB0LjQvtC90LDQu9GM0L3Ri9C5IiwicGhvbmVOdW1iZXIiOiIiLCJsb2dpbiI6InRlYWNoZXJfZnVsbEBpc21hcnQub3JnIiwiZW1haWwiOiJ0ZWFjaGVyX2Z1bGxAaXNtYXJ0Lm9yZyIsImNvbnRyYWN0VHlwZSI6InByaXZhdGUiLCJleHRlcm5hbFVzZXJTb3VyY2UiOm51bGwsImdvZE1vZGUiOnRydWUsImVkdWNvbnQiOnt9LCJfaWQiOiI2NWMzNDFiMmI5MmM3YTVmYmFmZWI2MDcifQ.g8I_2Btv7rGXWFT_jbBB9c0iAVhZshRxVIA8nbNqh0s";
  const catalogUrl = "https://edu.ismart.org/catalog";

  for (const [name, link] of Object.values(allEors)) {
    test(`Тест: ${name}`, async ({ page }) => {
      await allure.feature("Тесты: EORS");
      const list = await checkResponseStatus(page, `${catalogUrl}${link}${token}`);

      await list.waitFor();

      // Проверяем, что есть дочерние div с <a>

      await expect(list.locator("div:has(a)")).not.toBeEmpty();
    });
  }
});
