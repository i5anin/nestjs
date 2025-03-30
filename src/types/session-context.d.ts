import 'telegraf';
import { SceneSession } from './telegraf.context';

declare module 'telegraf' {
  interface SessionData extends SceneSession {}
}
