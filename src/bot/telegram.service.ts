import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf, Scenes, session } from 'telegraf';
import * as dotenv from 'dotenv';
import { WorkoutScene } from './scenes/workout.scene';
import { BotContext } from '../types/telegraf.context';

dotenv.config();

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot!: Telegraf<BotContext>;

  async onModuleInit(): Promise<void> {
    const token = process.env.BOT_TOKEN;
    if (!token) throw new Error('BOT_TOKEN не задан');

    const workoutScene = new WorkoutScene();
    const stage = new Scenes.Stage<BotContext>([workoutScene]);

    this.bot = new Telegraf<BotContext>(token);
    this.bot.use(session());
    this.bot.use(stage.middleware());

    this.bot.command('start', (ctx) => ctx.scene.enter('workoutScene'));

    await this.bot.launch();
    console.log('🤖 Бот запущен');
  }
}
