# Используем официальный образ Playwright с Node.js и браузерами
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимости через Yarn
RUN yarn install --frozen-lockfile

# Устанавливаем Allure CLI глобально
RUN npm install -g allure-commandline

# Копируем весь проект
COPY . .

CMD ["yarn", "start"]