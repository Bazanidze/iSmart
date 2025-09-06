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
import { userAutorization } from "../../src/fixtures/ActionLogOrRegister/AutorizationOrRegister";
import { methodRegister } from "../../src/fixtures/dataRegister";
import { tokenEnv } from "../../src/fixtures/TokenAuthorization/token";

test.describe("Tests Parent Catalog Tasks", async () => {
  test("Выбор фильтров", async ({ page }) => {
    const classNum = numberClass[0];
    const item = nameItem.logic;
    await allure.feature("Тесты: Родитель");
    await allure.story("Каталог заданий");
    const catalogPage = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
    await catalogPage.open("");
    const errors: { url: string; status: number; payload?: any }[] = [];
    page.on("response", async (response) => {
      const status = response.status();
      if (status >= 400) {
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
    await catalogPage.header.clickСatalogTasks();
    await catalogPage.catalogPageEl.clickButtonChooseFilter();
    await catalogPage.catalogPageEl.clickButtonFilterChooseClass();
    await catalogPage.catalogPageEl.chooseClassFilter(classNum);
    await catalogPage.catalogPageEl.clickButtonFilterChooseItem();
    await catalogPage.catalogPageEl.chooseCheckboxItemFilter(item);
    await catalogPage.catalogPageEl.clickButtonUseFilter();
    await allure.step("Проверки:", async () => {
      await allure.step(`1. Выбраны фильтры: Выбран ${classNum} класс`, async () => {
        expect(await catalogPage.catalogPageEl.textSelectedFilter("1")).toContain(classNum);
      });
      await allure.step(`2. Выбраны фильтры: Выбран предмет ${item} `, async () => {
        expect(await catalogPage.catalogPageEl.textSelectedFilter("2")).toBe(item);
      });
      await allure.step(`3. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
        expect(errors).toEqual([]);
      });
    });
  });

  test("Поиск заданий", async ({ page }) => {
    const wordSearch = "Слово";
    await allure.feature("Тесты: Родитель");
    await allure.story("Каталог заданий");
    const catalogPage = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
    await catalogPage.open("");
    const errors: { url: string; status: number; payload?: any }[] = [];
    page.on("response", async (response) => {
      const status = response.status();
      if (status >= 400) {
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
    await catalogPage.header.clickСatalogTasks();
    await catalogPage.catalogPageEl.setValuesInputSearch(wordSearch);
    await catalogPage.catalogPageEl.clickButtonSearchTasks();
    await catalogPage.catalogPageEl.getCountResultsSearch();
    await catalogPage.catalogPageEl.clickButtonShownResults();
    const countTextResults = await catalogPage.catalogPageEl.getCountAllTextResultsSearch();
    let results = false;
    await allure.step("Проверки:", async () => {
      for (let num = 1; num <= countTextResults; num++) {
        let textResults = await catalogPage.catalogPageEl.textResultsSearch(num.toString());
        if (textResults?.toLowerCase().includes(wordSearch.toLowerCase())) {
          results = true;
          await allure.step(
            `1. Результаты поиска: Поисковое слово "${wordSearch}", есть в результатах поиска- "${textResults}"`,
            async () => {
              expect(textResults.toLowerCase()).toContain(wordSearch.toLowerCase());
            }
          );
          break;
        }
      }
      if (!results) {
        await allure.step(`1. Поисковое слово "${wordSearch}- не найдено"`, async () => {
          expect(false).toBe(true);
        });
      }
      const countSecondResults = await catalogPage.catalogPageEl.getCountResultsSearch();
      await allure.step(`2. Результаты поиска: Отображено ${countSecondResults} результатов поиска`, async () => {
        expect(countSecondResults).toBe(10);
      });
      await allure.step(`3. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
        expect(errors).toEqual([]);
      });
    });
  });

  test("Поиск заданий с фильтрами", async ({ page }) => {
    const classNum = numberClass[6];
    const item = nameItem.logic;
    const wordSearch = "Числа";
    await allure.feature("Тесты: Родитель");
    await allure.story("Каталог заданий");
    const catalogPage = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
    await catalogPage.open("");
    const errors: { url: string; status: number; payload?: any }[] = [];
    page.on("response", async (response) => {
      const status = response.status();
      if (status >= 400) {
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
    await catalogPage.header.clickСatalogTasks();
    await catalogPage.catalogPageEl.clickButtonChooseFilter();
    await catalogPage.catalogPageEl.clickButtonFilterChooseClass();
    await catalogPage.catalogPageEl.chooseClassFilter(classNum);
    await catalogPage.catalogPageEl.clickButtonFilterChooseItem();
    await catalogPage.catalogPageEl.chooseCheckboxItemFilter(item);
    await catalogPage.catalogPageEl.clickButtonUseFilter();
    await catalogPage.catalogPageEl.setValuesInputSearch(wordSearch);
    await catalogPage.catalogPageEl.clickButtonSearchTasks();
    await catalogPage.catalogPageEl.getCountResultsSearch();
    const countTextResults = await catalogPage.catalogPageEl.getCountAllTextResultsSearch();
    const textClass = await catalogPage.catalogPageEl.textSelectedFilter("1");
    const textItem = await catalogPage.catalogPageEl.textSelectedFilter("2");
    let resultWord = false;
    let resultClass = false;
    let resultItem = false;
    await allure.step("Проверки:", async () => {
      for (let num = 1; num <= countTextResults; num++) {
        let textResults = await catalogPage.catalogPageEl.textResultsSearch(num.toString());
        if (resultWord && resultClass && resultItem) {
          break;
        }
        if (textResults?.toLowerCase().includes(wordSearch.toLowerCase()) && !resultWord) {
          resultWord = true;
          await allure.step(
            `1. Результаты поиска: Поисковое слово "${wordSearch}", есть в результатах поиска- "${textResults}"`,
            async () => {
              expect(textResults.toLowerCase()).toContain(wordSearch.toLowerCase());
            }
          );
        }
        if (textResults?.toLowerCase().includes(textClass.toLowerCase()) && !resultClass) {
          resultClass = true;
          await allure.step(
            `2. Результаты поиска: Класс "${textClass}", есть в результатах поиска- "${textResults}"`,
            async () => {
              expect(textResults.toLowerCase()).toContain(textClass.toLowerCase());
            }
          );
        }
        if (textResults?.toLowerCase().includes(textItem.toLowerCase()) && !resultItem) {
          resultItem = true;
          await allure.step(
            `3. Результаты поиска: Предмет "${textItem}", есть в результатах поиска- "${textResults}"`,
            async () => {
              expect(textResults.toLowerCase()).toContain(textItem.toLowerCase());
            }
          );
        }
      }
      await allure.step(`4. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
        expect(errors).toEqual([]);
      });
      if (!resultWord || !resultClass || !resultItem) {
        if (!resultWord) {
          await allure.step(`5. Поисковое слово "${wordSearch}- не найдено"`, async () => {
            expect(false).toBe(true);
          });
        }
        if (!resultClass) {
          await allure.step(`5. Класс "${textClass}"- не найдено`, async () => {
            expect(false).toBe(true);
          });
        }
        if (!resultItem) {
          await allure.step(`5. Предмет "${textItem}- не найдено"`, async () => {
            expect(false).toBe(true);
          });
        }
      }
    });
  });

  test("Просмотр задания в каталоге", async ({ page }) => {
    await allure.feature("Тесты: Родитель");
    await allure.story("Каталог заданий");
    const catalogPage = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
    await catalogPage.open("");
    const errors: { url: string; status: number; payload?: any }[] = [];
    page.on("response", async (response) => {
      const status = response.status();
      if (status >= 400) {
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
    await catalogPage.header.clickСatalogTasks();
    await catalogPage.catalogPageEl.clickSchoolMathematics();
    const buttonClass = await catalogPage.catalogPageEl.chooseClassPageItem(numberClass[3]);
    await catalogPage.catalogPageEl.clickButtonParentWatchTask();
    await catalogPage.catalogPageEl.divParentWatchTask.waitFor({ state: "visible" });
    await catalogPage.catalogPageEl.divH4ParentWatchTask.waitFor({ state: "visible" });
    await allure.step("Проверки:", async () => {
      await allure.step(`1. Видно задание`, async () => {
        await expect(catalogPage.catalogPageEl.divParentWatchTask).toBeVisible();
      });
      await allure.step(`2. Виден заголовок задания`, async () => {
        await expect(catalogPage.catalogPageEl.divH4ParentWatchTask).toBeVisible();
      });

      await allure.step(`3. Выбран класс ${numberClass[3]}`, async () => {
        await expect(buttonClass).toHaveClass("ismart-1t4oq4c-Button-container");
      });
    });
    await catalogPage.catalogPageEl.clickButtonParentCloseWatchTask();
    await allure.step("Проверки:", async () => {
      await allure.step(`4. Задание закрыто`, async () => {
        await expect(catalogPage.catalogPageEl.divParentWatchTask).not.toBeVisible();
      });
      await allure.step(`5. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
        expect(errors).toEqual([]);
      });
    });
  });

  test("Переход из каталога родителя в раннер ученика", async ({ page }) => {
    await allure.feature("Тесты: Родитель");
    await allure.story("Каталог заданий");
    const catalogPage = new UsersCabinetsPage(page);
    await tokenEnv(page, defaultUsers.parent[1], defaultUsers.parent[2]);
    await catalogPage.open("");
    const errors: { url: string; status: number; payload?: any }[] = [];
    page.on("response", async (response) => {
      const status = response.status();
      if (status >= 400) {
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
    await catalogPage.header.clickСatalogTasks();
    await catalogPage.catalogPageEl.clickSchoolRussianLanguage();
    const buttonClass = await catalogPage.catalogPageEl.chooseClassPageItem(numberClass[4]);
    await catalogPage.catalogPageEl.clickFirstSubtopics();
    await catalogPage.catalogPageEl.clickButtonDone();
    await catalogPage.runnerEl.waitOpen();
    await catalogPage.runnerEl.waitTaskOpen();
    await catalogPage.runnerEl.waitProgressScale();
    await allure.step("Проверки:", async () => {
      await allure.step(`1. Открылся раннер`, async () => {
        await expect(catalogPage.runnerEl.open).toBeVisible();
      });
      await allure.step(`2. Прогрузилось задание раннера`, async () => {
        await expect(catalogPage.runnerEl.taskOpen).toBeVisible();
      });

      await allure.step(`3. Отображается шкала прогресса`, async () => {
        await expect(catalogPage.runnerEl.progressScale).toBeVisible();
      });
      await allure.step(`4. Проверка на ошибки при загрузках страниц - ${errors}`, async () => {
        expect(errors).toEqual([]);
      });
    });
  });
});
