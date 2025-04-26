export class KeyValueStore {
    constructor(storeName) {
        this.storeName = storeName;
    }

    set = (key, value) => async (transaction) => {
        const store = transaction.objectStore(this.storeName);
        await store.put({value, key});
    };

    get = (key, defaultValue) => async (transaction) => {
        return new Promise((resolve, reject) => {
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);
            request.onsuccess = () => resolve(
                typeof request.result === "undefined" ? defaultValue : request.result.value);
            request.onerror = () => reject(request.error);
        });
    };

}
