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

export interface SessionData extends Scenes.SceneSessionData {
  data: Partial<TrainingData>;
  currentSet: number;
}

// ✅ Полный контекст
export interface BotContext extends Context<Update> {
  session: Scenes.SceneSession<SessionData> & SessionData;
  scene: Scenes.SceneContextScene<BotContext>;
  wizard: Scenes.WizardContextWizard<BotContext>;
}
