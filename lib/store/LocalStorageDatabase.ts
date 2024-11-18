import { DATABASE_KEY, Database, State, TEST_KEY } from './Database';

export class LocalStorageDatabase implements Database {
  isAvailable(): boolean {
    try {
      globalThis.localStorage.setItem(TEST_KEY, TEST_KEY);
      globalThis.localStorage.removeItem(TEST_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }
  async write(state: State): Promise<void> {
    try {
      const stringObject = JSON.stringify(state);
      globalThis.localStorage.setItem(DATABASE_KEY, stringObject);
    } catch (error) {}
  }
  async read(): Promise<Partial<State>> {
    try {
      return JSON.parse(localStorage.getItem(DATABASE_KEY) || '');
    } catch (error) {
      return {};
    }
  }
}
