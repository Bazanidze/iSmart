Локальный запуск в VSC:

1. Запустить - yarn install
2. установить - yarn playwright install
3. Установить - yarn add dotenv --dev
4. Создать в корне файл .env (с содержимым из .env.example)
5. запуск тестов - yarn start
6. Подготовка отчета - yarn posttest
7. Открытие отчета - yarn allure-open

---

Drone - ручной запуск на окружении EDU:

1. Клик "New Build"
2. Клик "Create"

---

Drone - ручной запуск на окружении NEXT:

1. Клик "New Build"
2. Заполнить инпуты: key = NAMESPACE value = next
3. Клик "+ Add"
4. Клик "Create"

---

Открытие отчета локально:

1. Скачать архив с отчетом с почты, и распаковать его
2. Запустить IDE (VSC или др)
3. Открыть папку в IDE с отчетом
4. Открыть файл в IDE index.html

---

Автоматически тесты запускаются при DEPLOY(PROMOTE) ветки MASTER из репозитория ismart на окружение NEXT или EDU

ДЛЯ ОТМЕНЫ ЗАПУСКА АВТОТЕСТОВ ПРИ promote УКАЗАТЬ В parametres: key: STOP_AUTOTESTS value: 1
