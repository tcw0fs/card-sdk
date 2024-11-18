import { Database, State } from './Database';
import { IndexedDBDatabase } from './IndexedDBDatabase';
import { LocalStorageDatabase } from './LocalStorageDatabase';
import { NoDatabase } from './NoDatabase';
import { SessionStorageDatabase } from './SessionStorageDatabase';

export class Store {
  private db: Database = new NoDatabase();
  state: State = {
    money: [],
  };

  constructor(db: Database) {
    this.setDB(db);
    this.writeDBToState();
  }

  private setDB(db: Database) {
    if (db.isAvailable()) this.db = db;
    else this.db = this.getFallbackDB();
  }

  private getFallbackDB(): Database {
    const indexedDBDatabase = new IndexedDBDatabase();
    const localStorageDatabase = new LocalStorageDatabase();
    const sessionStorageDatabase = new SessionStorageDatabase();
    if (indexedDBDatabase.isAvailable()) return indexedDBDatabase;
    if (localStorageDatabase.isAvailable()) return localStorageDatabase;
    if (sessionStorageDatabase.isAvailable()) return sessionStorageDatabase;
    return new NoDatabase();
  }

  private writeStateToDB(): void {
    this.db.write(this.state);
  }

  private writeDBToState(): void {
    Object.assign(this.state, this.db.read());
  }

  setItem() {
    this.writeStateToDB();
  }

  getItem(key: string): any {
    return (this.state as any)[key];
  }
}
