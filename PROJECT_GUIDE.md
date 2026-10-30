# Путеводитель: nestjs

Автономная инструкция: достаточно этой папки, исходников и перечисленных защищённых копий. История чатов и центральный каталог не требуются.

[Восстановление](RECOVERY.md) · [Карта файлов и зависимостей](PROJECT_MAP.json)

## Назначение

По [README.md](README.md): Система сбора, анализа и отправки различных метрик и статистики по работникам предприятия через Telegram.

Обнаруженные языки: JavaScript, TypeScript.

## Порядок чтения

1. Локальные AGENTS.md / CLAUDE.md и документы ниже.
2. Манифесты: версии среды, зависимости, команды.
3. Кандидаты точек входа; фактический запуск проверить по манифесту.
4. PROJECT_MAP.json: imports_local от источника к импортируемому файлу; входящие рёбра — потребители модуля.
5. RECOVERY.md: независимые данные, восстановление среды, запуск и критерии приёмки.

- [README.md](README.md)

## Манифесты

- [package.json](package.json)
- [doc/package.json](doc/package.json)

## Кандидаты точек входа

- [src/main.ts](src/main.ts)

## Основные файлы по локальным импортам

| Файл | Входящих импортов |
|---|---:|
| [src/app.service.ts](src/app.service.ts) | 3 |
| [src/bot/telegram.service.ts](src/bot/telegram.service.ts) | 3 |
| [src/types/telegraf.context.ts](src/types/telegraf.context.ts) | 3 |
| [src/app.controller.ts](src/app.controller.ts) | 2 |
| [src/app.module.ts](src/app.module.ts) | 2 |
| [doc/paths.js](doc/paths.js) | 1 |
| [doc/treeBuilder.js](doc/treeBuilder.js) | 1 |
| [doc/fileStats.js](doc/fileStats.js) | 1 |
| [doc/projectConfig.js](doc/projectConfig.js) | 1 |
| [doc/config.js](doc/config.js) | 1 |
| [src/bot/scenes/workout.scene.ts](src/bot/scenes/workout.scene.ts) | 1 |
| [src/bot/utils/constants.ts](src/bot/utils/constants.ts) | 1 |

## Проверки

- [src/app.controller.spec.ts](src/app.controller.spec.ts)
- [test/app.e2e-spec.ts](test/app.e2e-spec.ts)
- [test/jest-e2e.json](test/jest-e2e.json)

## Чтение карты без специальных плагинов

PROJECT_MAP.json — UTF-8 JSON: nodes и edges. Пути файлов относительные. contains обозначает наличие файла; imports_local — статически распознанный импорт; declares_dependency — объявление пакета в манифесте. evidence содержит источник и, где доступно, строку. Карта не исполняет код.

Статус исходного анализа: static-scan-complete; ограничений чтения: 0. Исходный снимок: 2026-10-30T14:47:11.360Z.

После изменения кода перечитайте затронутые файлы: карта является снимком. Отсутствие ребра не доказывает отсутствие зависимости.
