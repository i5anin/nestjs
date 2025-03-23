import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class TelegramService {
  private bot: Telegraf;

  constructor() {
    const token = process.env.BOT_TOKEN;
    if (!token) {
      throw new Error('❌ BOT_TOKEN не задан в .env');
    }

    this.bot = new Telegraf(token);

    // Команда /start
    this.bot.start((ctx) => {
      console.log(`📥 /start от ${ctx.from.username || ctx.from.id}`);
      ctx.reply('👋 Hello from NestJS bot');
    });

    // Команда /ping
    this.bot.command('ping', (ctx) => {
      console.log(`📥 /ping от ${ctx.from.username || ctx.from.id}`);
      ctx.reply('🏓 pong');
    });

    // Ловим все сообщения
    this.bot.on('message', (ctx) => {
      const msg = ctx.message as Message;
      const from = ctx.from?.username || ctx.from?.id;

      if ('text' in msg) {
        console.log(`💬 Текст от ${from}: ${msg.text}`);
      } else {
        console.log(`📎 Не-текстовое сообщение от ${from}`);
      }
    });
  }

  async launch() {
    console.log('🤖 bot.launch()...');
    await this.bot.launch();
    console.log('✅ bot запущен');
  }
}
