# Используем официальный образ Playwright с браузерами и зависимостями
FROM mcr.microsoft.com/playwright:v1.55.0

# Рабочая директория
WORKDIR /app

# Копируем package.json и yarn.lock (если есть)
COPY package.json yarn.lock ./

# Устанавливаем все зависимости, указанные в package.json
RUN yarn install --frozen-lockfile
RUN apt-get update && \
    apt-get install -y openjdk-17-jre zip && \
    rm -rf /var/lib/apt/lists/*
# Устанавливаем браузеры Playwright (если нужно)
# RUN yarn playwright install --with-deps

COPY ./playwright.config.ts ./playwright.config.ts
COPY ./tsconfig.json ./tsconfig.json
COPY ./env.d.ts ./env.d.ts
COPY ./build.sh ./build.sh
COPY ./tests ./tests
COPY ./src ./src

