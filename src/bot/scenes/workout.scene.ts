import { Scenes } from 'telegraf';
import {
  categories,
  exercises,
  defaultSets,
  defaultReps,
  Category,
} from '../utils/constants';
import { BotContext } from '../../types/telegraf.context';

export class WorkoutScene extends Scenes.BaseScene<BotContext> {
  constructor() {
    super('workoutScene');

    this.enter((ctx) => {
      ctx.session.data = {};
      ctx.session.currentSet = 1;

      return ctx.reply('Выбери категорию:', {
        reply_markup: {
          keyboard: categories.map((c) => [c]),
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    });

    this.on('text', async (ctx) => {
      const data = ctx.session.data;

      // 1. Категория
      if (!data.category) {
        const cat = ctx.message.text;

        if (!categories.includes(cat as Category)) {
          return ctx.reply('Неверная категория. Попробуй снова.');
        }

        data.category = cat;
        const list = exercises[cat as Category];

        return ctx.reply('Выбери упражнение:', {
          reply_markup: {
            keyboard: list.map((e) => [e]),
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      }

      // 2. Упражнение
      if (!data.exercise) {
        data.exercise = ctx.message.text;

        return ctx.reply('Сколько подходов?', {
          reply_markup: {
            keyboard: defaultSets.map((s) => [String(s)]).concat([['Кастом']]),
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      }

      // 3. Количество подходов
      if (!data.sets) {
        const val = ctx.message.text;

        if (val === 'Кастом') return ctx.reply('Введи количество подходов:');

        const parsed = parseInt(val, 10);
        if (isNaN(parsed)) return ctx.reply('Неверный формат. Введи число.');

        data.sets = parsed;
        data.setsData = [];

        return ctx.reply(`Подход #${ctx.session.currentSet}. Введи вес:`);
      }

      // 4. Вес / Повторы на каждый подход
      const setIndex = ctx.session.currentSet - 1;
      const currentSet = data.setsData?.[setIndex] ?? { weight: 0, reps: 0 };

      if (currentSet.weight === 0) {
        const weight = parseFloat(ctx.message.text);
        if (isNaN(weight)) return ctx.reply('Неверный вес.');

        currentSet.weight = weight;
        data.setsData![setIndex] = currentSet;

        return ctx.reply('Сколько повторений?', {
          reply_markup: {
            keyboard: defaultReps.map((r) => [String(r)]).concat([['Кастом']]),
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      }

      if (currentSet.reps === 0) {
        const val = ctx.message.text;
        const reps = val === 'Кастом' ? undefined : parseInt(val, 10);

        if (!reps || isNaN(reps)) return ctx.reply('Введи число повторений.');

        currentSet.reps = reps;
        data.setsData![setIndex] = currentSet;

        if (ctx.session.currentSet < data.sets) {
          ctx.session.currentSet++;
          return ctx.reply(`Подход #${ctx.session.currentSet}. Введи вес:`);
        }

        return ctx.reply('Это упражнение на одну сторону?', {
          reply_markup: {
            keyboard: [['Да'], ['Нет']],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      }

      // 5. Одна сторона?
      if (data.oneSided === undefined) {
        data.oneSided = ctx.message.text === 'Да';
        return ctx.reply('Укажи вес штанги (если есть) или "0":');
      }

      // 6. Вес штанги
      if (data.barbellWeight === undefined) {
        const val = parseFloat(ctx.message.text);
        data.barbellWeight = isNaN(val) ? 0 : val;

        return ctx.replyWithMarkdown(
          `✅ Тренировка записана!\n\`\`\`json\n${JSON.stringify(
            data,
            null,
            2,
          )}\n\`\`\``,
        );
      }
    });
  }
}
