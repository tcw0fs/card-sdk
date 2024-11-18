import { DATABASE_KEY, Database, State } from './Database';

export class IndexedDBDatabase implements Database {
  private dbName: string;
  private storeName: string;

  constructor(
    dbName: string = 'defaultDB',
    storeName: string = 'defaultStore'
  ) {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  isAvailable(): boolean {
    return !globalThis.indexedDB;
  }
  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }
  async write(state: State): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(JSON.stringify(state), DATABASE_KEY);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  async read(): Promise<Partial<State>> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(DATABASE_KEY);
      request.onsuccess = () => resolve(JSON.parse(request.result || '{}'));
      request.onerror = () => reject(request.error);
    });
  }
}
