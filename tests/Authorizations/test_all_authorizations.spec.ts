import { test, expect, chromium } from "@playwright/test";
import { allure } from "allure-playwright";
import { allURL } from "../../src/fixtures/sitesEnv";
import { defaultUsers, myUsers, adminUsers } from "../../src/fixtures/dataUsers";
import { CatalogPage } from "../../src/PageObjects/CatalogPage/CatalogPage";
import { userAutorization } from "../../src/fixtures/ActionLogOrRegister/AutorizationOrRegister";
import { methodRegister } from "../../src/fixtures/dataRegister";
import { baseURL } from "../../playwright.config";

test.describe("Tests: All users autorization", () => {
  test("Родитель: Авторизация по email и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Родитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, defaultUsers.parent[0], "", methodRegister.password);
    const catalogPage = new CatalogPage(newPage);
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

  test("Родитель: Авторизация по логину и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Родитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.parentLogin[0], "", methodRegister.login, myUsers.parentLogin[3]);
    const catalogPage = new CatalogPage(newPage);
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

  test.skip("Родитель: Авторизация по email и коду с почты", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Родитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.parent[0], "", methodRegister.code, myUsers.parent[3]);
    const catalogPage = new CatalogPage(newPage);
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

  test("Учитель: Авторизация по email и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Учитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, defaultUsers.teacher[0], "", methodRegister.password);
    const catalogPage = new CatalogPage(newPage);
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

  test("Учитель: Авторизация по логину и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Учитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.teacherLogin[0], "", methodRegister.login, myUsers.teacherLogin[3]);
    const catalogPage = new CatalogPage(newPage);
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

  test.skip("Учитель: Авторизация по email и коду с почты", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Учитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.teacher[0], "", methodRegister.code, myUsers.teacher[3]);
    const catalogPage = new CatalogPage(newPage);
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

  test("Самостоятельный ученик: Авторизация по email и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Самостоятельный ученик");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, defaultUsers.myIndepStudent[0], "", methodRegister.password);
    const catalogPage = new CatalogPage(newPage);
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

  test("Самостоятельный ученик: Авторизация по логину и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Самостоятельный ученик");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(
      page,
      myUsers.indepStudentLogin[0],
      "",
      methodRegister.login,
      myUsers.indepStudentLogin[3]
    );
    const catalogPage = new CatalogPage(newPage);
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

  test.skip("Самостоятельный ученик: Авторизация по email и коду с почты", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Самостоятельный ученик");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.indepStudent[0], "", methodRegister.code, myUsers.indepStudent[3]);
    const catalogPage = new CatalogPage(newPage);
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

  // for (const [login, password] of Object.values(adminUsers)) {
  //   test(`Авторизация: ${login.toUpperCase()}`, async ({ page }) => {
  //     await allure.feature("Тесты: Авторизация пользователей");
  //     await allure.story("Авторизация методистов");
  //     const {
  //   page: newPage,
  //   browser,
  //   context,
  // } = await userAutorization(page, login, "", methodRegister.password, password);
  //     const catalogPage = new CatalogPage(newPage);
  //     await allure.step("Проверки:", async () => {
  //       await allure.step(`1. Роль для ${login} - 'Администратор' в хедере`, async () => {
  //         expect(await catalogPage.header.textUserProfile()).toContain("Администратор");
  //       });
  //     });
  //
  //
  //   });
  // }

  test.skip("Родитель: Авторизация по ссылке", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Родитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.parent[0], "", methodRegister.link, myUsers.parent[3]);
    const catalogPage = new CatalogPage(newPage);
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

  test.skip("Учитель: Авторизация по ссылке", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Учитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.teacher[0], "", methodRegister.link, myUsers.teacher[3]);
    const catalogPage = new CatalogPage(newPage);
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

  test.skip("Самостоятельный ученик: Авторизация по ссылке", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Самостоятельный ученик");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.indepStudent[0], "", methodRegister.link, myUsers.indepStudent[3]);
    const catalogPage = new CatalogPage(newPage);
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

  test("Администратор: Авторизация по логину и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Администратор");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.admin[0], "", methodRegister.password, myUsers.admin[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Администратор' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Администратор");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Администратор: Авторизация по почте и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Администратор");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.admin[4], "", methodRegister.password, myUsers.admin[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Администратор' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Администратор");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Суперпользователь: Авторизация по логину и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Суперпользователь");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.superUser[0], "", methodRegister.password, myUsers.superUser[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Суперпользователь' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Суперпользователь");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Суперпользователь: Авторизация по почте и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Суперпользователь");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.superUser[4], "", methodRegister.password, myUsers.superUser[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Суперпользователь' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Суперпользователь");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Контент: Авторизация по логину и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Контент");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.content[0], "", methodRegister.password, myUsers.content[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Контент' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Контент");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Контент: Авторизация по почте и паролю", async ({ page }) => {
    await allure.feature("Тесты: Авторизация пользователей");
    await allure.story("Контент");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.content[4], "", methodRegister.password, myUsers.content[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Контент' в хедере", async () => {
        expect(await catalogPage.header.textUserProfile()).toContain("Контент");
      });
    });
    await context.close();
    await browser.close();
  });
});

test.describe("Tests: Landing autorization", () => {
  const urlPath =
    baseURL == "https://next.ismart.org/catalog/" ? "https://web.next.ismart.org/" : "https://ismart.org/";

  test("Родитель: Авторизация по email и паролю", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Родитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, defaultUsers.parent[0], urlPath, methodRegister.password);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Родитель' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Родитель");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Родитель: Авторизация по логину и паролю", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Родитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.parentLogin[0], urlPath, methodRegister.login, myUsers.parentLogin[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Родитель' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Родитель");
      });
    });
    await context.close();
    await browser.close();
  });

  test.skip("Родитель: Авторизация по email и коду с почты", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Родитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.parent[0], urlPath, methodRegister.code, myUsers.parent[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Родитель' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Родитель");
      });
    });
    await context.close();
    await browser.close();
  });

  test.skip("Родитель: Авторизация по ссылке", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Родитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.parent[0], urlPath, methodRegister.link, myUsers.parent[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Родитель' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Родитель");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Учитель: Авторизация по email и паролю", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Учитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, defaultUsers.teacher[0], urlPath, methodRegister.password);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Учитель' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Учитель");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Учитель: Авторизация по логину и паролю", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Учитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.teacherLogin[0], urlPath, methodRegister.login, myUsers.teacherLogin[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Учитель' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Учитель");
      });
    });
    await context.close();
    await browser.close();
  });

  test.skip("Учитель: Авторизация по email и коду с почты", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Учитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.teacher[0], urlPath, methodRegister.code, myUsers.teacher[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Учитель' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Учитель");
      });
    });
    await context.close();
    await browser.close();
  });

  test.skip("Учитель: Авторизация по ссылке", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Учитель");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.teacher[0], urlPath, methodRegister.link, myUsers.teacher[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Учитель' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Учитель");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Самостоятельный ученик: Авторизация по email и паролю", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Самостоятельный ученик");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, defaultUsers.myIndepStudent[0], urlPath, methodRegister.password);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Ученик' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Ученик");
      });
    });
    await context.close();
    await browser.close();
  });

  test("Самостоятельный ученик: Авторизация по логину и паролю", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Самостоятельный ученик");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(
      page,
      myUsers.indepStudentLogin[0],
      urlPath,
      methodRegister.login,
      myUsers.indepStudentLogin[3]
    );
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Ученик' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Ученик");
      });
    });
    await context.close();
    await browser.close();
  });

  test.skip("Самостоятельный ученик: Авторизация по email и коду с почты", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Самостоятельный ученик");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.indepStudent[0], urlPath, methodRegister.code, myUsers.indepStudent[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Ученик' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Ученик");
      });
    });
    await context.close();
    await browser.close();
  });

  test.skip("Самостоятельный ученик: Авторизация по ссылке", async ({ page }) => {
    await allure.feature("Тесты: Лэндинг - Авторизация пользователей");
    await allure.story("Самостоятельный ученик");
    const {
      page: newPage,
      browser,
      context,
    } = await userAutorization(page, myUsers.indepStudent[0], urlPath, methodRegister.link, myUsers.indepStudent[3]);
    const catalogPage = new CatalogPage(newPage);
    await allure.step("Проверки:", async () => {
      await allure.step("1. Роль 'Ученик' в хедере", async () => {
        expect(await catalogPage.landingPageEl.textUserProfile()).toContain("Ученик");
      });
    });
    await context.close();
    await browser.close();
  });
});
