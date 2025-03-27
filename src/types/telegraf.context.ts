import { Context, Scenes } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

export interface TrainingSet {
  weight: number;
  reps: number;
}

export interface TrainingData {
  category: string;
  exercise: string;
  sets: number;
  setsData: TrainingSet[];
  oneSided: boolean;
  barbellWeight: number;
}

// ✅ Это SessionData, как требует Telegraf
export interface SessionData {
  data: Partial<TrainingData>;
  currentSet: number;
}

// ✅ Полный контекст
export interface BotContext extends Context<Update> {
  session: SessionData;
  scene: Scenes.SceneContextScene<BotContext>;
  wizard: Scenes.WizardContextWizard<BotContext>;
}
