import { Page, Locator, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class CatalogPageEl {
  readonly page: Page;
  readonly schoolMathematics: Locator;
  readonly schoolGeometry: Locator;
  readonly inputNameTask: Locator;
  readonly schoolRussianLanguage: Locator;
  readonly buttonCreateTask: Locator;
  readonly buttonChooseFilter: Locator;
  readonly buttonFilterChooseClass: Locator;
  readonly buttonFilterChooseItem: Locator;
  readonly buttonUseFilter: Locator;
  readonly buttonResetFilter: Locator;
  readonly inputSearch: Locator;
  readonly buttonSearchTasks: Locator;
  readonly allResultsSearch: Locator;
  readonly countResultsSearch: Locator;
  readonly buttonShownResults: Locator;
  readonly buttonParentWatchTask: Locator;
  readonly divParentWatchTask: Locator;
  readonly divH4ParentWatchTask: Locator;
  readonly buttonParentCloseWatchTask: Locator;
  readonly firstSubtopics: Locator;
  readonly buttonDone: Locator;
  readonly firstSubtopicsStudent: Locator;
  readonly buttonPurchasedCollect: Locator;
  readonly buttonCountBuyItemShop: Locator;
  readonly countDivBuyItem: Locator;
  readonly countAvailableTasks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.schoolMathematics = page.locator("//a[starts-with(@href, '/catalog/math-full')]"); // Школьная программа "Математика"
    this.schoolGeometry = page.locator("//a[starts-with(@href, '/catalog/0ac4a2-geometriya')]"); // Школьная программа "Геометрия"
    this.schoolRussianLanguage = page.locator("//a[starts-with(@href, '/catalog/lang-rus-full')]"); // Школьная программа "Русский язык"
    this.inputNameTask = page.locator(".ismart-10w9mkf-Text-container span"); // Инпут для ввода названия задания при создании родителем/учителем
    this.buttonCreateTask = page.locator(
      "//div[@class='ismart-p12xtx-Flexbox-container']/button[contains(text(),'Создать')]"
    ); // Кнопка "Создать" для задания
    this.buttonChooseFilter = page.locator("//span[contains(text(), 'Выбрать фильтры')]/preceding-sibling::button"); // Кнопка "Выбрать фильтры"
    this.buttonFilterChooseClass = page.locator("//button[contains(text(), 'Выбрать класс')]"); // Кнопка "Выбрать класс" в фильтре
    this.buttonFilterChooseItem = page.locator("//button[contains(text(), 'Выбрать предмет')]"); // Кнопка "Выбрать предмет" в фильтре
    this.buttonUseFilter = page.locator("//button[contains(text(), 'Применить фильтры')]"); // Кнопка "Применить фильтры" в фильтре
    this.buttonResetFilter = page.locator("//button[contains(text(), 'Сбросить фильтры')]"); // Кнопка "Сбросить фильтры" в фильтре
    this.inputSearch = page.locator("input.ismart-d3nllz-TextField-input"); // Инпут "Поиск"
    this.buttonSearchTasks = page.locator("//button[contains(text(), 'Найти задания')]"); // Кнопка "Найти задания"
    this.allResultsSearch = page.locator(
      "//div[@class = 'ismart-s3xrwx-Flexbox-container']//div[@class = 'ismart-8z5gwt-Flexbox-container']/span"
    ); // Результаты поиска - все слова в Темах, подтемах, название предмета и класса. Отсюда берем количество для цикла
    this.countResultsSearch = page.locator("div.ismart-s3xrwx-Flexbox-container div.ismart-iixdn1-Flexbox-container"); // Количество показанных элементов (div) результатов поиска
    this.buttonShownResults = page.locator("//button[contains(text(), 'Показано')]"); // Кнопка "Показано 5 результатов из ..." в результатах поиска
    this.buttonParentWatchTask = page.locator("(//button[@class = 'ismart-1uooz41-Button-container'])[1]"); // Родитель: Первая кнопка посмотреть подтему (глаз)
    this.divParentWatchTask = page.locator("//div[@class = 'ismart-6ibmlf-Block-container']"); // Родитель: блок просмотра задания из подтемы (после клика на глаз)
    this.divH4ParentWatchTask = page.locator("//div[@class = 'ismart-6ibmlf-Block-container']//h4"); // Родитель: Заголовок в блоке просмотра задания из подтемы (после клика на глаз)
    this.buttonParentCloseWatchTask = page.locator("//button[@class = 'ismart-131cmwo-Button-container']"); // Родитель: Кнопка "ЗАкрыть" после просмотра подтемы
    this.firstSubtopics = page.locator("(//div[@class='ismart-1bxm13l-Flexbox-container'])[1]"); // Первая подтема в теме на странице предмета для Родителя
    this.firstSubtopicsStudent = page.locator("(//a[@class='ismart-1v3dk8b-Link-container'])[1]"); // Первая подтема в теме на странице предмета для Учеников
    this.buttonDone = page.locator("//button[contains(text(), 'Готово')]"); // Кнопка "Готово" (в форме "Выбор ученика" пока что Родителя при клике на подтему в каталоге)

    this.buttonPurchasedCollect = page.locator("//span[contains(text(), 'Купленные')]/ancestor::button"); // Кнопка "Купленные подборки"
    this.buttonCountBuyItemShop = page.locator("(//span[contains(text(), 'Купленные')]/following::span)[2]"); // Количество, купленных предметов, в кнопке "Купленные подборки"
    this.countDivBuyItem = page.locator("//div[@class = 'ismart-w8pm3z-Flexbox-container']"); // Количество отметок "Галочка", купленных предметов
    this.countAvailableTasks = page.locator("//span[@class = 'ismart-yo8mmj-Text-container']"); // Количество "Доступно заданий"
  }

  async getCountAvailableTasks() {
    await this.countAvailableTasks.waitFor({ state: "visible" });
    await allure.step('Получаем количество "Доступных заданий"', async () => {});
    const countTasks = await this.countAvailableTasks.textContent();
    const text = countTasks?.trim();
    const value = text ? text.match(/\d+/) : "";
    return Number(value);
  }

  async clickButtonPurchasedCollect() {
    await allure.step(`Каталог заданий: Клик на кнопку "Купленные подборки"`, async () => {
      await this.buttonPurchasedCollect.waitFor({ state: "visible" });

      await this.buttonPurchasedCollect.click();
    });
  }

  async clickButtonDone() {
    await allure.step(`Страница предмета: Клик на кнопку "Готово" при выборе ученика`, async () => {
      await this.buttonDone.click();
    });
  }

  async clickFirstSubtopics() {
    await allure.step(`Страница предмета: Клик на первую подтему`, async () => {
      await this.firstSubtopics.click();
    });
  }

  async clickFirstSubtopicsStudent() {
    await allure.step(`Страница предмета: Клик на первую подтему`, async () => {
      await this.firstSubtopicsStudent.click();
    });
  }

  async clickButtonParentCloseWatchTask() {
    await allure.step(`Страница предмета: Клик "Закрыть" просмотр подтемы`, async () => {
      await this.buttonParentCloseWatchTask.click();
    });
  }

  async clickButtonParentWatchTask() {
    await allure.step(`Страница предмета: Клик "Посмотреть подтему" (глаз)`, async () => {
      await this.buttonParentWatchTask.click();
    });
  }

  async clickSchoolMathematics() {
    await allure.step(`Каталог заданий: Клик "Математика" школьная программа`, async () => {
      await this.schoolMathematics.click();
    });
  }

  async clickSchoolGeometry() {
    await allure.step(`Каталог заданий: Клик "Геометрия" школьная программа`, async () => {
      await this.schoolGeometry.click();
    });
  }

  async clickSchoolRussianLanguage() {
    await allure.step(`Каталог заданий: Клик "Русский язык" школьная программа`, async () => {
      await this.schoolRussianLanguage.click();
    });
  }

  async clickButtonCreateTask() {
    await allure.step(`Каталог заданий: Клик на кнопку "Создать" для задания`, async () => {
      await this.buttonCreateTask.click();
    });
  }

  async clickButtonChooseFilter() {
    await allure.step(`Каталог заданий: Клик на кнопку "Выбрать фильтры"`, async () => {
      await this.buttonChooseFilter.click();
    });
  }

  async clickButtonUseFilter() {
    await allure.step(`Фильтры: Клик на кнопку "Применить фильтры"`, async () => {
      await this.buttonUseFilter.click();
    });
  }

  async clickButtonFilterChooseItem() {
    await allure.step(`Фильтры: Клик на кнопку "Выбрать предмет"`, async () => {
      await this.buttonFilterChooseItem.click();
    });
  }

  async clickButtonFilterChooseClass() {
    await allure.step(`Фильтры: Клик на кнопку "Выбрать класс"`, async () => {
      await this.buttonFilterChooseClass.click();
    });
  }

  async clickButtonSearchTasks() {
    await allure.step(`Каталог заданий: Клик на кнопку "Найти задания"`, async () => {
      await this.buttonSearchTasks.click();
    });
  }

  async clickButtonShownResults() {
    await allure.step(
      `Каталог заданий: Клик на кнопку "Показано 5 результатов из ..." в результатах поиска`,
      async () => {
        await this.buttonShownResults.click();
      }
    );
  }

  async setValuesInputNameTask(nameTask: string) {
    await allure.step(`Каталог заданий: Ввод названия задания`, async () => {
      await this.inputNameTask.waitFor();
      await this.inputNameTask.fill(nameTask);
    });
  }

  async setValuesInputSearch(wordSearch: string) {
    await allure.step(`Каталог заданий: Ввод в поле поиска "${wordSearch}"`, async () => {
      await this.inputSearch.waitFor();
      await this.inputSearch.fill(wordSearch);
    });
  }

  async getCountResultsSearch() {
    await new Promise((r) => setTimeout(r, 2000));
    return await this.countResultsSearch.count();
  }

  async getCountAllTextResultsSearch() {
    return await this.allResultsSearch.count();
  }

  async getButtonCountBuyItemShop() {
    return Number(await this.buttonCountBuyItemShop.textContent());
  }

  async getCountDivBuyItem() {
    return await this.countDivBuyItem.count();
  }

  async chooseSubthemes(count: number) {
    for (let num = 1; num <= count; num++) {
      await allure.step(`Страница предмета: Выбор подтемы №${num}`, async () => {
        await this.page.locator(`(//div[@class ='ismart-1f6wg2f-Flexbox-container']/div)[${num}]`).click(); // Выбор подтем ( указываем количество подтем)
      });
    }
  }

  async chooseClassFilter(numberClass: string) {
    await allure.step(`Фильтры: Клик на класс "${numberClass}"`, async () => {
      await this.page.locator(`(//div[contains(text(), '${numberClass}')])[1]`).click(); // Выбираем класс в фильтре
    });
  }

  async chooseCheckboxItemFilter(nameItem: string) {
    await allure.step(`Фильтры: Выбор чекбокса "${nameItem}"`, async () => {
      await this.page.locator(`(//div[contains(text(), '${nameItem}')])[1]`).click(); // Выбираем предмет в фильтре "Выбрать предмет"
    });
  }

  async chooseClassPageItem(numberClass: string) {
    const button = await this.page.locator(
      `(//div[@class = 'ismart-1hv38yp-Flexbox-container']/button[contains(text(), '${numberClass}')])[1]`
    );
    await allure.step(`Страница предмета: Выбор класса "${numberClass}"`, async () => {
      await button.click(); // Выбираем класс на странице предмета (клик по классу)
      await new Promise((r) => setTimeout(r, 1000));
    });
    return button;
  }

  async textSelectedFilter(numberFilter: string) {
    const textFilter = await this.page
      .locator(`(//div[@class='ismart-1ms4bib-Flexbox-container']/button)[${numberFilter}]`)
      .textContent(); // Текст выбранных фильтров на странице "Каталог заданий"
    return textFilter ? textFilter.trim() : "";
  }

  async textResultsSearch(numberResults: string) {
    const textResults = await this.page
      .locator(
        `(//div[@class='ismart-s3xrwx-Flexbox-container']//div[@class='ismart-8z5gwt-Flexbox-container']/span)[${numberResults}]`
      )
      .textContent(); // Текст в результатах поиска
    return textResults ? textResults.trim() : "";
  }

  async textBuyItem(itemName: string) {
    const textResults = await this.page
      .locator(
        `(//div[@class = 'ismart-w8pm3z-Flexbox-container']/preceding-sibling::div/h1[contains(text(), '${itemName}')])[1]`
      )
      .textContent(); // Текст в результатах поиска
    return textResults ? textResults.trim() : "";
  }
}
