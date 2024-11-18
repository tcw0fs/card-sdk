import { DATABASE_KEY, Database, State, TEST_KEY } from './Database';

export class SessionStorageDatabase implements Database {
  isAvailable(): boolean {
    try {
      globalThis.sessionStorage.setItem(TEST_KEY, TEST_KEY);
      globalThis.sessionStorage.removeItem(TEST_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }
  async write(state: State): Promise<void> {
    try {
      const stringObject = JSON.stringify(state);
      globalThis.sessionStorage.setItem(DATABASE_KEY, stringObject);
    } catch (error) {}
  }
  async read(): Promise<Partial<State>> {
    try {
      return JSON.parse(sessionStorage.getItem(DATABASE_KEY) || '');
    } catch (error) {
      return {};
    }
  }
}
