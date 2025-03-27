import 'telegraf';
import { SceneSessionData } from './types/telegraf.context';

declare module 'telegraf' {
  interface SessionData extends SceneSessionData {}
}
