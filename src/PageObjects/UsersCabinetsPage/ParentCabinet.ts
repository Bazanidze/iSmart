import { Page, Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class ParentMyChilds {
  readonly page: Page;
  readonly addChildButton: Locator;
  readonly inputName: Locator;
  readonly addButtonForm: Locator;
  readonly selectChild: Locator;
  readonly buttonAddStudentSelect: Locator;
  readonly buttonAllChilds: Locator;
  readonly buttonSettingStudent: Locator;
  readonly buttonAllSettingStudent: Locator;
  readonly buttonChangeNameStudent: Locator;
  readonly buttonDeleteStudent: Locator;
  readonly nameStudentChild: Locator;
  readonly buttonDeleteForm: Locator;
  readonly headingNoStudent: Locator;
  readonly buttonShedule: Locator;
  readonly buttonPlusTodayShedule: Locator;
  readonly nameLastTaskTodayShedule: Locator;
  readonly buttonLogCabinetStudent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addChildButton = page.locator("//button[contains(text(), 'Добавить ребёнка')]"); // Кнопка "Добавить ребёнка"
    this.inputName = page.locator("//input[@placeholder='Введите имя ребёнка']"); // Инпут для ввода имени ребёнка при добавлении/изменении
    this.addButtonForm = page.locator("//button[@class = 'ismart-1wrfdiu-Button-container']"); // Кнопка "Добавить"/"Сохранить" в форме "Добавить/изменить ребёнка"
    this.selectChild = page.locator(".ismart-12ife8b-Flexbox-container svg"); // Селект выбора учеников
    this.buttonAddStudentSelect = page.locator("//button[@class = 'ismart-1s4pyxu-Button-container']"); // Кнопка "Добавить ученика" в селекте выбора учеников
    this.buttonAllChilds = page.locator("button.ismart-ifmd16-Button-container"); // Кнопка "Все дети"
    this.buttonSettingStudent = page.locator("(//button[@class = 'ismart-kq5db3-Button-container'])[1]"); // Кнопка (две точки) в карточке первого ребенка на странице "Все дети"
    this.buttonAllSettingStudent = page.locator("//button[@class = 'ismart-kq5db3-Button-container']"); // Все кнопки (две точки) в карточках детей на странице "Все дети"
    this.buttonChangeNameStudent = page.locator("//button[@class = 'ismart-10jcacq-Button-container']"); // Кнопка "Редактировать имя" в карточке ученика на странице "Все дети" при клике на ":"
    this.buttonDeleteStudent = page.locator("//button[@class = 'ismart-1hru1xf-Button-container']"); // Кнопка "Удалить" в карточке ученика на странице "Все дети" при клике на ":"
    this.nameStudentChild = page.locator("(//div[@class = 'ismart-16q4cz3-Flexbox-container'] / span) [1]"); // Имя в первой карточке ученика на странице "Все дети"
    this.buttonDeleteForm = page.locator("//button[@class = 'ismart-1soas5t-Button-container']"); // Кнопка "Да, удалить" в форме удаления ученика
    this.headingNoStudent = page.locator("//h4[@class = 'ismart-15jq5pb-Header-container']"); // Заголовок "У вас ещё нет учеников" на вкладке "Мои дети" при кол-ве учеников = 0
    this.buttonShedule = page.locator("//a[@href='/parent/dashboard/childrens/schedules']"); // Кнопка "Расписание" в "Мои дети"
    this.buttonPlusTodayShedule = page.locator(
      "//span[@class='ismart-11pi3tu-Text-container']/parent::div/parent::div//button[@class='ismart-ruu5u1-Button-container']"
    ); // Кнопка "+" на сегодня в "Расписании"
    this.nameLastTaskTodayShedule = page.locator(
      "(//span[@class = 'ismart-11pi3tu-Text-container']/parent::div/following-sibling::div//span[@class='ismart-42ygjh-Text-container'])[last()]"
    ); // Название последнего созданного задания в расписании в "Мои дети"
    this.buttonLogCabinetStudent = page.locator("//button[contains(text(), 'Войти')]"); // Кнопка "Войти в кабинет ученика" в разделе "Мои дети" (посмотреть может и в другом месте тоже локатор будет работать)
  }

  async clickButtonLogCabinetStudent() {
    await allure.step(`Мои дети: Клик на кнопку 'Войти в кабинет ученика'`, async () => {
      await this.buttonLogCabinetStudent.click();
    });
  }

  async clickAddChildButton() {
    await allure.step(`Мои дети: Клик на кнопку 'Добавить ребёнка'`, async () => {
      await this.addChildButton.click();
    });
  }

  async clickAddButtonForm() {
    await allure.step(`Форма "Добавить/изменить ребёнка": Клик на кнопку'Добавить'`, async () => {
      await this.addButtonForm.click();
    });
  }

  async clickButtonAddStudentSelect() {
    await allure.step(`Мои дети: Клик на кнопку 'Добавить ученика' в селекте выбора учеников`, async () => {
      await this.buttonAddStudentSelect.click();
    });
  }

  async clickSelectChild() {
    await allure.step(`Мои дети: Клик на кнопку 'Селект выбора учеников'`, async () => {
      await this.selectChild.click();
    });
  }

  async clickButtonAllChilds() {
    await allure.step(`Мои дети: Клик на кнопку 'Все дети'`, async () => {
      await this.buttonAllChilds.click();
    });
  }

  async clickButtonSettingStudent() {
    await allure.step(`Мои дети: Клик на кнопку ':'`, async () => {
      await this.buttonSettingStudent.click();
    });
  }

  async clickButtonChangeNameStudent() {
    await allure.step(`Мои дети: Клик на кнопку 'Редактировать имя'`, async () => {
      await this.buttonChangeNameStudent.click();
    });
  }

  async clickButtonDeleteStudent() {
    await allure.step(`Мои дети: Клик на кнопку 'Удалить'`, async () => {
      await this.buttonDeleteStudent.click();
    });
  }

  async clickButtonDeleteForm() {
    await allure.step(`Форма удаления ученика: Клик на кнопку 'Да, удалить'`, async () => {
      await this.buttonDeleteForm.click();
    });
  }

  async clickButtonShedule() {
    await allure.step(`Мои дети: Клик на кнопку 'Расписание'`, async () => {
      await this.buttonShedule.click();
    });
  }

  async clickButtonPlusTodayShedule() {
    await allure.step(`Блок "Расписание": Клик на кнопку '+' на дату (сегодня)`, async () => {
      await this.buttonPlusTodayShedule.click();
    });
  }

  async setValueInputName(name: string) {
    await allure.step(`Форма "Добавить/изменить ребёнка": Ввод имени ребёнка ${name}`, async () => {
      await this.inputName.waitFor();
      await this.inputName.clear();
      await this.inputName.fill(name);
    });
  }

  async textNameStudentChild() {
    await this.nameStudentChild.waitFor();
    return await this.nameStudentChild.textContent();
  }

  async textHeadingNoStudent() {
    await this.headingNoStudent.waitFor();
    return await this.headingNoStudent.textContent();
  }

  async textNameLastTaskTodayShedule() {
    await this.nameLastTaskTodayShedule.waitFor();
    return await this.nameLastTaskTodayShedule.textContent();
  }
}
