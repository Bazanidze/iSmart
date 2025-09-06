import { test, expect, chromium } from "@playwright/test";
import { allure } from "allure-playwright";

import {
  defaultUsers,
  myUsers,
  adminUsers,
  nameChilds,
  cardsPay,
  nameTasks,
  numberClass,
  nameItem,
} from "../../src/fixtures/dataUsers";
import { UsersCabinetsPage } from "../../src/PageObjects/UsersCabinetsPage/UsersCabinetsPage";
import { userAutorization, userRegister } from "../../src/fixtures/ActionLogOrRegister/AutorizationOrRegister";
import { methodRegister } from "../../src/fixtures/dataRegister";
import { tokenEnv } from "../../src/fixtures/TokenAuthorization/token";
import { baseURL } from "../../playwright.config";
import { CatalogPage } from "../../src/PageObjects/CatalogPage/CatalogPage";
import { userRole } from "../../src/fixtures/dataRegister";
import { actionPay } from "../../src/fixtures/PaymentWindow/ActionPay";
import { tBankError } from "../../src/fixtures/errorsURL";

test.describe("Tests Indep Student Shop Page", async () => {
  test("Покупка годового пакета по карте", async ({ page }) => {
    const classNum = numberClass[3];
    await allure.feature("Тесты: Самостоятельный ученик");
    await allure.story("Магазин");
    let catalogPage = new CatalogPage(page);
    if (baseURL === "https://next.ismart.org/catalog/") {
      const {
        page: page2,
        browser,
        context,
      } = await userRegister(page, "", userRole.IndepStudent, methodRegister.code);
      page = page2;
      catalogPage = new CatalogPage(page);
    } else {
      await tokenEnv(page, myUsers.indepStudentLogin[1], myUsers.indepStudentLogin[2]);
      await catalogPage.open("");
    }
    const errors: { url: string; status: number; payload?: any }[] = [];
    page.on("response", async (response) => {
      const status = response.status();
      if (status >= 400 && response.url() != tBankError) {
        const request = response.request();
        let payload;
        try {
          payload = request.postDataJSON?.() ?? request.postData?.();
        } catch (e) {
          payload = request.postData?.();
        }
        errors.push({ url: response.url(), status, payload });
      }
    });
    await catalogPage.header.clickShop();
    const shopPage = catalogPage;
    await shopPage.shopPageEl.waitSelectClassWait();
    const selectClass = await shopPage.shopPageEl.chooseClass(classNum);
    const countItemFullPackage = await shopPage.shopPageEl.getCountItemYearFullPackage();
    await allure.step("Проверки:", async () => {
      await allure.step(`1. Выбран класс "${classNum}"`, async () => {
        await expect(selectClass).toHaveClass("ismart-4bkzg5-Flexbox-container");
      });
    });
    await shopPage.shopPageEl.clickButtonBuyYearFullPackage();
    await shopPage.shopPageEl.clickButtonBuyFormPackage();
    if (baseURL === "https://next.ismart.org/catalog/") {
      await actionPay(page, cardsPay[0], "Package");
      await shopPage.shopPageEl.clickButtonCloseThankBuy();
      await shopPage.header.clickСatalogTasks();
      await page.reload({ waitUntil: "load" });
      await shopPage.catalogPageEl.clickButtonPurchasedCollect();
      const countButton = await shopPage.catalogPageEl.getButtonCountBuyItemShop();
      const countItemBuy = await shopPage.catalogPageEl.getCountDivBuyItem();
      await allure.step("Проверки:", async () => {
        await allure.step(
          `1. Кнопка "Купленные подборки" отображает количество предметов, купленных в пакете ${countItemFullPackage}`,
          async () => {
            expect(countItemFullPackage).toBe(countButton);
          }
        );
        await allure.step(
          `2. Отображаются "${countItemFullPackage}" отметок (галок) на купленных предметах в пакете`,
          async () => {
            expect(countItemFullPackage).toBe(countItemBuy);
          }
        );
        await allure.step(`3. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
          expect(errors).toEqual([]);
        });
      });
    } else {
      await shopPage.paymentWindow.windowPay.waitFor({ state: "visible" });
      await allure.step("Проверки:", async () => {
        await allure.step(`1. Открыто окно эквайринга Т-банка`, async () => {
          expect(shopPage.paymentWindow.windowPay).toBeVisible();
        });
        await allure.step(`2. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
          expect(errors).toEqual([]);
        });
      });
    }
  });

  test("Покупка Предмета по карте", async ({ page }) => {
    const classNum = numberClass[10];
    const itemName = nameItem.russianLang;
    await allure.feature("Тесты: Самостоятельный ученик");
    await allure.story("Магазин");
    let catalogPage = new CatalogPage(page);
    if (baseURL === "https://next.ismart.org/catalog/") {
      const {
        page: page2,
        browser,
        context,
      } = await userRegister(page, "", userRole.IndepStudent, methodRegister.code);
      page = page2;
      catalogPage = new CatalogPage(page);
    } else {
      await tokenEnv(page, myUsers.indepStudentLogin[1], myUsers.indepStudentLogin[2]);
      await catalogPage.open("");
    }
    const errors: { url: string; status: number; payload?: any }[] = [];
    page.on("response", async (response) => {
      const status = response.status();
      if (status >= 400 && response.url() != tBankError) {
        const request = response.request();
        let payload;
        try {
          payload = request.postDataJSON?.() ?? request.postData?.();
        } catch (e) {
          payload = request.postData?.();
        }
        errors.push({ url: response.url(), status, payload });
      }
    });
    await catalogPage.header.clickShop();
    const shopPage = catalogPage;
    await shopPage.shopPageEl.waitSelectClassWait();
    const selectClass = await shopPage.shopPageEl.chooseClass(classNum);
    await allure.step("Проверки:", async () => {
      await allure.step(`1. Выбран класс "${classNum}"`, async () => {
        await expect(selectClass).toHaveClass("ismart-4bkzg5-Flexbox-container");
      });
    });
    await shopPage.shopPageEl.chooseButtonMonthItem("6");
    await shopPage.shopPageEl.chooseItemBuy(itemName);
    await shopPage.header.clickСart();
    await shopPage.cartEl.clickButtonPay();
    if (baseURL === "https://next.ismart.org/catalog/") {
      await actionPay(page, cardsPay[0]);
      await shopPage.shopPageEl.clickButtonCloseThankBuy();
      await shopPage.header.clickСatalogTasks();
      await page.reload({ waitUntil: "load" });
      await shopPage.catalogPageEl.clickButtonPurchasedCollect();
      const countButton = await shopPage.catalogPageEl.getButtonCountBuyItemShop();
      const countItemBuy = await shopPage.catalogPageEl.getCountDivBuyItem();
      await allure.step("Проверки:", async () => {
        await allure.step(
          `1. Кнопка "Купленные подборки" отображает количество предметов, купленных в пакете "1"`,
          async () => {
            expect(countButton).toBe(1);
          }
        );
        await allure.step(`2. Отображается "1" отметка (галка) на купленном предмете`, async () => {
          expect(countItemBuy).toBe(1);
        });
        await allure.step(`3. Куплен предмет "${itemName}"`, async () => {
          expect(await shopPage.catalogPageEl.textBuyItem(itemName)).toBe(itemName);
        });
        await allure.step(`4. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
          expect(errors).toEqual([]);
        });
      });
    } else {
      await shopPage.paymentWindow.windowPay.waitFor({ state: "visible" });
      await allure.step("Проверки:", async () => {
        await allure.step(`1. Открыто окно эквайринга Т-банка`, async () => {
          expect(shopPage.paymentWindow.windowPay).toBeVisible();
        });
        await allure.step(`2. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
          expect(errors).toEqual([]);
        });
      });
    }
  });

  test("Покупка заданий по карте", async ({ page }) => {
    const countTasksBuy = "20";
    await allure.feature("Тесты: Самостоятельный ученик");
    await allure.story("Магазин");
    let catalogPage = new CatalogPage(page);
    if (baseURL === "https://next.ismart.org/catalog/") {
      const {
        page: page2,
        browser,
        context,
      } = await userRegister(page, "", userRole.IndepStudent, methodRegister.code);
      page = page2;
      catalogPage = new CatalogPage(page);
    } else {
      await tokenEnv(page, myUsers.indepStudentLogin[1], myUsers.indepStudentLogin[2]);
      await catalogPage.open("");
    }
    const errors: { url: string; status: number; payload?: any }[] = [];
    page.on("response", async (response) => {
      const status = response.status();
      if (status >= 400 && response.url() != tBankError) {
        const request = response.request();
        let payload;
        try {
          payload = request.postDataJSON?.() ?? request.postData?.();
        } catch (e) {
          payload = request.postData?.();
        }
        errors.push({ url: response.url(), status, payload });
      }
    });
    const firstCountTasks = await catalogPage.catalogPageEl.getCountAvailableTasks();
    await catalogPage.header.clickAssistant();
    const firstCountQuestions = await catalogPage.assistantPageEl.getCountQuestions();
    await catalogPage.header.clickShop();
    const shopPage = catalogPage;
    await shopPage.shopPageEl.waitSelectClassWait();
    await shopPage.shopPageEl.chooseCountTasksBuy(countTasksBuy);
    await shopPage.shopPageEl.clickButtonCartBuyTasks();
    await shopPage.header.clickСart();
    await shopPage.cartEl.clickButtonPay();
    if (baseURL === "https://next.ismart.org/catalog/") {
      await actionPay(page, cardsPay[0]);
      await shopPage.shopPageEl.clickButtonCloseThankBuy();
      await shopPage.header.clickСatalogTasks();
      await page.reload({ waitUntil: "load" });
      const secondCountTasks = await catalogPage.catalogPageEl.getCountAvailableTasks();
      await allure.step("Проверки:", async () => {
        await allure.step(
          `1. Количество доступных заданий увеличилось не меньше чем на '${countTasksBuy}'`,
          async () => {
            expect(secondCountTasks).toBeGreaterThanOrEqual(firstCountTasks + Number(countTasksBuy));
          }
        );
        await catalogPage.header.clickAssistant();
        const secondCountQuestions = await catalogPage.assistantPageEl.getCountQuestions();
        await allure.step(
          `2. Количество вопросов на странице "Помощник" увеличилось на '${countTasksBuy}'`,
          async () => {
            expect(secondCountQuestions).toBe(firstCountQuestions + Number(countTasksBuy));
          }
        );
        await allure.step(`3. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
          expect(errors).toEqual([]);
        });
      });
    } else {
      await shopPage.paymentWindow.windowPay.waitFor({ state: "visible" });
      await allure.step("Проверки:", async () => {
        await allure.step(`1. Открыто окно эквайринга Т-банка`, async () => {
          expect(shopPage.paymentWindow.windowPay).toBeVisible();
        });
        await allure.step(`2. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
          expect(errors).toEqual([]);
        });
      });
    }
  });
});
