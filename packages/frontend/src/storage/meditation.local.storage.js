import { v4 as uuid } from 'uuid';

class MeditationLocalStorage {
    constructor() {
        this.dbName = 'MeditationDB';
        this.storeName = 'Meditations';
        this.initDB();
    }

    async initDB() {
        this.db = await new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async saveMeditation(meditation) {
        const db = this.db;
        meditation.uuid = uuid();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(meditation);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getPendingMeditations() {
        return await this.getAllMeditations();
    }

    async clearPendingMeditations() {
        const db = this.db;
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getAllMeditations() {
        const db = this.db;
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}

export const meditationStorage = new MeditationLocalStorage();