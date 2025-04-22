
const DB_NAME = 'MeditationDB';
const DB_VERSION = 1;
const db = await createIndexedDb(DB_NAME, DB_VERSION);

export class LocalStorage {
    constructor(storeName) {
        this.storeName = storeName;
    }

    async add(item) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(item);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

}


function createIndexedDb(dbName, version) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            createSchema(db, event.oldVersion);
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}


function createSchema(db, existingDbVersion) {
    // Initial setup for version 1
    if (existingDbVersion < 1) {
        db.createObjectStore('meditations', { keyPath: 'localId', autoIncrement: true });
    }

}