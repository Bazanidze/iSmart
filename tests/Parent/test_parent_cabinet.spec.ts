import { test, expect, chromium } from "@playwright/test";
import { allure } from "allure-playwright";

import { allURL } from "../../src/fixtures/sitesEnv";
import { defaultUsers, myUsers, adminUsers, nameChilds, cardsPay, nameTasks } from "../../src/fixtures/dataUsers";
import { UsersCabinetsPage } from "../../src/PageObjects/UsersCabinetsPage/UsersCabinetsPage";
import { userAutorization } from "../../src/fixtures/ActionLogOrRegister/AutorizationOrRegister";
import { methodRegister } from "../../src/fixtures/dataRegister";
import { addChild } from "../../src/fixtures/Parent/addChild";
import { baseURL } from "../../playwright.config";
import { actionPay } from "../../src/fixtures/PaymentWindow/ActionPay";
import { tokenEnv } from "../../src/fixtures/TokenAuthorization/token";
import { tBankError } from "../../src/fixtures/errorsURL";

test.describe("Tests Parent Cabinet", async () => {
  test("Добавление первого ребёнка", async ({ page }) => {
    await allure.feature("Тесты: Родитель");
    await allure.story("Кабинет родителя: Раздел 'Мои дети'");
    const cabinetUser = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
    await cabinetUser.open("");
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
    await cabinetUser.header.clickСabinetUser();
    await cabinetUser.usersCabinet.clickParentMyChilds();
    await cabinetUser.parentMyChild.clickAddChildButton();
    await addChild(page, nameChilds[1]);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Ученик' в хедере", async () => {
        expect(await cabinetUser.header.textUserProfile()).toContain("Ученик");
      });
      await allure.step("2. Название кабинета в хедере 'Кабинет ученика'", async () => {
        expect(await cabinetUser.header.textСabinetUser()).toContain("Кабинет ученика");
      });
      await allure.step(`3. Имя ученика в кабинете '${nameChilds[1]}'`, async () => {
        expect(await cabinetUser.studentTasks.textNameStudentCabinet()).toContain(nameChilds[1]);
      });
      await allure.step(`4. Есть кнопка "В кабинет родителя"`, async () => {
        await expect(cabinetUser.studentTasks.parentCabinetButton).toBeVisible();
      });
      await allure.step("5. Проверка на ошибки при загрузках страниц", async () => {
        expect(errors).toEqual([]);
      });
    });
  });

  test("Добавление ученика из селекта выбора", async ({ page }) => {
    await allure.feature("Тесты: Родитель");
    await allure.story("Кабинет родителя: Раздел 'Мои дети'");
    const cabinetUser = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
    await cabinetUser.open("");
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
    await cabinetUser.header.clickСabinetUser();
    await cabinetUser.usersCabinet.clickParentMyChilds();
    await cabinetUser.parentMyChild.clickSelectChild();
    await cabinetUser.parentMyChild.clickButtonAddStudentSelect();
    await addChild(page, nameChilds[0]);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Ученик' в хедере", async () => {
        expect(await cabinetUser.header.textUserProfile()).toContain("Ученик");
      });
      await allure.step("2. Название кабинета в хедере 'Кабинет ученика'", async () => {
        expect(await cabinetUser.header.textСabinetUser()).toContain("Кабинет ученика");
      });
      await allure.step(`3. Имя ученика в кабинете '${nameChilds[0]}'`, async () => {
        expect(await cabinetUser.studentTasks.textNameStudentCabinet()).toContain(nameChilds[0]);
      });
      await allure.step(`4. Есть кнопка "В кабинет родителя"`, async () => {
        await expect(cabinetUser.studentTasks.parentCabinetButton).toBeVisible();
      });
      await allure.step("5. Проверка на ошибки при загрузках страниц", async () => {
        expect(errors).toEqual([]);
      });
    });
  });

  test("Добавление ученика со страницы 'Все дети'", async ({ page }) => {
    await allure.feature("Тесты: Родитель");
    await allure.story("Кабинет родителя: Раздел 'Мои дети'");
    const cabinetUser = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
    await cabinetUser.open("");
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
    await cabinetUser.header.clickСabinetUser();
    await cabinetUser.usersCabinet.clickParentMyChilds();
    await cabinetUser.parentMyChild.clickButtonAllChilds();
    await cabinetUser.parentMyChild.clickAddChildButton();
    await addChild(page, nameChilds[2]);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Ученик' в хедере", async () => {
        expect(await cabinetUser.header.textUserProfile()).toContain("Ученик");
      });
      await allure.step("2. Название кабинета в хедере 'Кабинет ученика'", async () => {
        expect(await cabinetUser.header.textСabinetUser()).toContain("Кабинет ученика");
      });
      await allure.step(`3. Имя ученика в кабинете '${nameChilds[2]}'`, async () => {
        expect(await cabinetUser.studentTasks.textNameStudentCabinet()).toContain(nameChilds[2]);
      });
      await allure.step(`4. Есть кнопка "В кабинет родителя"`, async () => {
        await expect(cabinetUser.studentTasks.parentCabinetButton).toBeVisible();
      });
      await allure.step("5. Проверка на ошибки при загрузках страниц", async () => {
        expect(errors).toEqual([]);
      });
    });
  });

  test("Редактирование имени ученика", async ({ page }) => {
    await allure.feature("Тесты: Родитель");
    await allure.story("Кабинет родителя: Раздел 'Мои дети'");
    const cabinetUser = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
    await cabinetUser.open("");
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
    await cabinetUser.header.clickСabinetUser();
    await cabinetUser.usersCabinet.clickParentMyChilds();
    await cabinetUser.parentMyChild.clickButtonAllChilds();
    await cabinetUser.parentMyChild.clickButtonSettingStudent();
    await cabinetUser.parentMyChild.clickButtonChangeNameStudent();
    await addChild(page, nameChilds[3]);
    await allure.step("Проверки:", async () => {
      await allure.step(`1. Имя ребёнка сменилось на '${nameChilds[3]}'`, async () => {
        expect(await cabinetUser.parentMyChild.textNameStudentChild()).toContain(nameChilds[3]);
      });
      await allure.step("2. Проверка на ошибки при загрузках страниц", async () => {
        expect(errors).toEqual([]);
      });
    });
  });

  test("Создание задания родителем", async ({ page }) => {
    await allure.feature("Тесты: Родитель");
    await allure.story("Кабинет родителя: Раздел 'Мои дети'");
    const cabinetUser = new UsersCabinetsPage(page);
    await tokenEnv(page, defaultUsers.parent[1], defaultUsers.parent[2]);
    await cabinetUser.open("");
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
    await cabinetUser.header.clickСabinetUser();
    await cabinetUser.usersCabinet.clickParentMyChilds();
    await cabinetUser.parentMyChild.clickButtonShedule();
    await cabinetUser.parentMyChild.clickButtonPlusTodayShedule();
    await cabinetUser.catalogPageEl.setValuesInputNameTask(nameTasks.parent);
    await cabinetUser.catalogPageEl.clickSchoolRussianLanguage();
    await cabinetUser.catalogPageEl.chooseSubthemes(3);
    await cabinetUser.catalogPageEl.clickButtonCreateTask();
    await allure.step("Проверки:", async () => {
      await allure.step(`1. В расписании, созданно задание '${nameTasks.parent}'`, async () => {
        expect(await cabinetUser.parentMyChild.textNameLastTaskTodayShedule()).toContain(nameTasks.parent);
      });
      await allure.step("2. Проверка на ошибки при загрузках страниц", async () => {
        expect(errors).toEqual([]);
      });
    });
  });

  test("Удаление ученика/учеников", async ({ page }) => {
    await allure.feature("Тесты: Родитель");
    await allure.story("Кабинет родителя: Раздел 'Мои дети'");
    const cabinetUser = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
    await cabinetUser.open("");
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
    await cabinetUser.header.clickСabinetUser();
    await cabinetUser.usersCabinet.clickParentMyChilds();
    await cabinetUser.parentMyChild.clickButtonAllChilds();
    const countStudents = await cabinetUser.parentMyChild.buttonAllSettingStudent.count();
    for (let count = 0; count < countStudents; count++) {
      await cabinetUser.parentMyChild.clickButtonSettingStudent();
      await cabinetUser.parentMyChild.clickButtonDeleteStudent();
      await cabinetUser.parentMyChild.clickButtonDeleteForm();
    }
    await allure.step("Проверки:", async () => {
      await allure.step(`1. Отображается кнопка "Добавить ребёнка"`, async () => {
        expect(await cabinetUser.parentMyChild.addChildButton).toBeVisible();
      });
      await allure.step(`2. Отображается заголовок "У вас ещё нет учеников"`, async () => {
        expect(await cabinetUser.parentMyChild.textHeadingNoStudent()).toContain("У вас ещё нет учеников");
      });
      await allure.step("3. Проверка на ошибки при загрузках страниц", async () => {
        expect(errors).toEqual([]);
      });
    });
  });

  test("Пополнение кошелька", async ({ page }) => {
    const summWallet = 300;
    await allure.feature("Тесты: Родитель");
    await allure.story("Кабинет родителя: Раздел 'Кошелек'");
    const cabinetUser = new UsersCabinetsPage(page);
    await tokenEnv(page, myUsers.parentLogin[1], myUsers.parentLogin[2]);
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
    await cabinetUser.open("");
    await cabinetUser.header.clickСabinetUser();
    const firstBalance = await cabinetUser.usersCabinet.textBalanceWallet();
    await cabinetUser.usersCabinet.clickWallet();
    await cabinetUser.usersCabinet.setValuesInputSummAddWalletForm(summWallet.toString());
    await cabinetUser.usersCabinet.clickButtonCardPayAddWalletForm();
    if (baseURL === "https://next.ismart.org/catalog/") {
      await actionPay(page, cardsPay[0]);
      const endBalance = await cabinetUser.usersCabinet.textBalanceWallet();
      await allure.step("Проверки:", async () => {
        await allure.step(
          `1. Баланс повысился на ${summWallet} рублей: Начальный баланс - ${firstBalance} рублей. После пополнения стало - ${endBalance} рублей`,
          async () => {
            expect(endBalance).toBeCloseTo(firstBalance + summWallet, 1);
          }
        );
        await allure.step("2. Проверка на ошибки при загрузках страниц", async () => {
          expect(errors).toEqual([]);
        });
      });
    } else {
      await cabinetUser.paymentWindow.windowPay.waitFor({ state: "visible" });
      await allure.step(`1. Открыто окно эквайринга Т-банка`, async () => {
        expect(cabinetUser.paymentWindow.windowPay).toBeVisible();
      });
      await allure.step("2. Проверка на ошибки при загрузках страниц", async () => {
        expect(errors).toEqual([]);
      });
    }
  });
});
