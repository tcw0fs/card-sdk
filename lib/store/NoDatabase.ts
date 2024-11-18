import { Database, State } from './Database';

export class NoDatabase implements Database {
  isAvailable(): boolean {
    return true;
  }
  async write(_state: State): Promise<void> {}
  async read(): Promise<Partial<State>> {
    return {};
  }
}
