import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

import { studentUrlAccess, teacherUrlAccess, schoolAdminUrlAccess } from "../../src/fixtures/dataURLAccessCF";
import { userAutorization } from "../../src/fixtures/ActionLogOrRegister/AutorizationOrRegister";
import { defaultUsers } from "../../src/fixtures/dataUsers";
import { methodRegister } from "../../src/fixtures/dataRegister";

test.describe("The code of the future URL access", () => {
  const catalogUrl = "https://edu.ismart.org/catalog";
  for (const [name, link] of Object.values(teacherUrlAccess)) {
    test(`Тест: ${name}`, async ({ page }) => {
      await allure.feature("Тесты: Код будущего URL доступы");
      const {
        page: newPage,
        browser,
        context,
      } = await userAutorization(
        page,
        defaultUsers.teacherCF,
        catalogUrl,
        methodRegister.password,
        defaultUsers.defaultPassword
      );
      const errors: { url: string; status: number }[] = [];
      newPage.on("response", (response) => {
        const status = response.status();
        if (status >= 400) {
          errors.push({ url: response.url(), status });
        }
      });
      await (await newPage).goto(link, { waitUntil: "load" });
      await allure.step("Проверка на ошибки при загрузке страницы", async () => {
        expect(errors).toEqual([]);
      });
      await context.close();
      await browser.close();
    });
  }

  for (const [name, link] of Object.values(studentUrlAccess)) {
    test(`Тест: ${name}`, async ({ page }) => {
      await allure.feature("Тесты: Код будущего URL доступы");
      const {
        page: newPage,
        browser,
        context,
      } = await userAutorization(
        page,
        defaultUsers.studentCF,
        catalogUrl,
        methodRegister.password,
        defaultUsers.defaultPassword
      );
      const errors: { url: string; status: number }[] = [];
      newPage.on("response", (response) => {
        const status = response.status();
        if (status >= 400) {
          errors.push({ url: response.url(), status });
        }
      });
      await (await newPage).goto(link, { waitUntil: "load" });
      await allure.step("Проверка на ошибки при загрузке страницы", async () => {
        expect(errors).toEqual([]);
      });
      await context.close();
      await browser.close();
    });
  }

  for (const [name, link] of Object.values(schoolAdminUrlAccess)) {
    test(`Тест: ${name}`, async ({ page }) => {
      await allure.feature("Тесты: Код будущего URL доступы");
      const {
        page: newPage,
        browser,
        context,
      } = await userAutorization(
        page,
        defaultUsers.schoolAdminCF,
        catalogUrl,
        methodRegister.password,
        defaultUsers.defaultPassword
      );
      const errors: { url: string; status: number }[] = [];
      newPage.on("response", (response) => {
        const status = response.status();
        if (status >= 400) {
          errors.push({ url: response.url(), status });
        }
      });
      await (await newPage).goto(link, { waitUntil: "load" });
      await allure.step("Проверка на ошибки при загрузке страницы", async () => {
        expect(errors).toEqual([]);
      });
      await context.close();
      await browser.close();
    });
  }

  test(`Тест: Переход по ссылке code.ismart`, async ({ page }) => {
    await allure.feature("Тесты: Код будущего URL доступы");
    const errors: { url: string; status: number }[] = [];
    page.on("response", (response) => {
      const status = response.status();
      if (status >= 400) {
        errors.push({ url: response.url(), status });
      }
    });
    page.goto(
      "https://code.ismart.org/?folder=/home/coder/ismart-test/Python_%D0%B4%D0%BB%D1%8F_%D0%98_%D0%B8_%D0%9D_%D0%9C/%D0%9D%D0%B0%D1%87%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C1&payload=[[%22gotoLineMode%22%2C%22true%22]%2C[%22openFile%22%2C%22vscode-remote%3A///home/coder/ismart-test/Python_%D0%B4%D0%BB%D1%8F_%D0%98_%D0%B8_%D0%9D_%D0%9C/%D0%9D%D0%B0%D1%87%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C1/333.ipynb%22]]",
      { waitUntil: "load" }
    );
    await allure.step("Проверка: Ожидание видимости элемента", async () => {
      const isVisible = page.locator("div.card-box");
      expect(isVisible).toBeVisible();
    });
    await allure.step("Проверка на ошибки при загрузке страницы", async () => {
      expect(errors).toEqual([]);
    });
  });

  test(`Тест: Переход по ссылке code.ismart 2`, async ({ page }) => {
    await allure.feature("Тесты: Код будущего URL доступы");
    const errors: { url: string; status: number }[] = [];
    page.on("response", (response) => {
      const status = response.status();
      if (status >= 400) {
        errors.push({ url: response.url(), status });
      }
    });
    page.goto("https://code.ismart.org/?folder=/home/coder/ismart-test", { waitUntil: "load" });
    await allure.step("Проверка: Ожидание видимости элемента", async () => {
      const isVisible = page.locator("div.card-box");
      expect(isVisible).toBeVisible();
    });
    await allure.step("Проверка на ошибки при загрузке страницы", async () => {
      expect(errors).toEqual([]);
    });
  });
});
