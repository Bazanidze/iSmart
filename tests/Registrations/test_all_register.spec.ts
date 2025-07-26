import { test, expect, chromium } from "@playwright/test";
import { allure } from "allure-playwright";
import { allURL } from "../../src/fixtures/sitesEnv";
import { defaultUsers, myUsers, adminUsers } from "../../src/fixtures/dataUsers";
import { userRole, methodRegister } from "..//../src/fixtures/dataRegister";
import { CatalogPage } from "../../src/PageObjects/CatalogPage/CatalogPage";
import { userAutorization, userRegister } from "../../src/fixtures/ActionLogOrRegister/AutorizationOrRegister";

const siteUrl = process.env.SITE_URL || allURL.nextEnv;

test.describe("Tests: All users register", () => {
  test("Учитель: Регистрация по email и коду", async ({ page }) => {
    await allure.feature("Тесты: Регистрация пользователей");
    await allure.story("Учитель");
    const { page: page2, browser, context } = await userRegister(page, "", userRole.teacher, methodRegister.code);
    const catalogPage = new CatalogPage(page2);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Учитель' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Учитель");
      });
      await allure.step("2. Название кабинета в хедере 'Кабинет учителя'", async () => {
        expect(await catalogPage.header.textСabinetUser()).toContain("Кабинет учителя");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Учитель: Регистрация по email и ссылке", async ({ page }) => {
    await allure.feature("Тесты: Регистрация пользователей");
    await allure.story("Учитель");
    const { page: page2, browser, context } = await userRegister(page, "", userRole.teacher, methodRegister.link);
    const catalogPage = new CatalogPage(page2);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Учитель' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Учитель");
      });
      await allure.step("2. Название кабинета в хедере 'Кабинет учителя'", async () => {
        expect(await catalogPage.header.textСabinetUser()).toContain("Кабинет учителя");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Родитель: Регистрация по email и коду", async ({ page }) => {
    await allure.feature("Тесты: Регистрация пользователей");
    await allure.story("Родитель");
    const { page: page2, browser, context } = await userRegister(page, "", userRole.parent, methodRegister.code);
    const catalogPage = new CatalogPage(page2);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Родитель' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Родитель");
      });
      await allure.step("2. Название кабинета в хедере 'Родитель'", async () => {
        expect(await catalogPage.header.textСabinetUser()).toContain("Кабинет родителя");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Родитель: Регистрация по email и ссылке", async ({ page }) => {
    await allure.feature("Тесты: Регистрация пользователей");
    await allure.story("Родитель");
    const { page: page2, browser, context } = await userRegister(page, "", userRole.parent, methodRegister.link);
    const catalogPage = new CatalogPage(page2);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Родитель' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Родитель");
      });
      await allure.step("2. Название кабинета в хедере 'Кабинет родителя'", async () => {
        expect(await catalogPage.header.textСabinetUser()).toContain("Кабинет родителя");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Самостоятельный ученик: Регистрация по email и коду", async ({ page }) => {
    await allure.feature("Тесты: Регистрация пользователей");
    await allure.story("Самостоятельный ученик");
    const { page: page2, browser, context } = await userRegister(page, "", userRole.IndepStudent, methodRegister.code);
    const catalogPage = new CatalogPage(page2);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Ученик' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Ученик");
      });
      await allure.step("2. Название кабинета в хедере 'Кабинет ученика'", async () => {
        expect(await catalogPage.header.textСabinetUser()).toContain("Кабинет ученика");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Самостоятельный ученик: Регистрация по email и ссылке", async ({ page }) => {
    await allure.feature("Тесты: Регистрация пользователей");
    await allure.story("Самостоятельный ученик");
    const { page: page2, browser, context } = await userRegister(page, "", userRole.IndepStudent, methodRegister.link);
    const catalogPage = new CatalogPage(page2);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Ученик' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Ученик");
      });
      await allure.step("2. Название кабинета в хедере 'Кабинет ученика'", async () => {
        expect(await catalogPage.header.textСabinetUser()).toContain("Кабинет ученика");
      });
    });
    await context.close();
    await browser.close();
  });
});
