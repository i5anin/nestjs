export const categories = ['Грудь', 'Спина', 'Ноги', 'Плечи', 'Руки'] as const;
export type Category = typeof categories[number];

export const exercises: Record<Category, string[]> = {
  Грудь: ['Жим лёжа', 'Разводка гантелей'],
  Спина: ['Тяга штанги', 'Подтягивания'],
  Ноги: ['Присед', 'Жим ногами'],
  Плечи: ['Жим вверх', 'Махи в стороны'],
  Руки: ['Бицепс', 'Французский жим'],
};

export const defaultSets = [3, 4, 5];
export const defaultReps = [10, 12, 15];
