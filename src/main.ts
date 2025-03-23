import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './bot/telegram.service';

async function bootstrap() {
  console.log('📦 Запуск Nest приложения...');
  const app = await NestFactory.create(AppModule);
  console.log('✅ Nest приложение создано');

  const telegramService = app.get(TelegramService);
  console.log('🤖 TelegramService получен');

  try {
    await telegramService.launch();
    console.log('✅ Telegram бот запущен');
  } catch (error) {
    console.error('❌ Ошибка запуска Telegram бота:', error);
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Приложение доступно по адресу: http://localhost:${port}`);
}
void bootstrap();
