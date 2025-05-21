export class KeyValueStore {
  constructor(storeName) {
    this.storeName = storeName;
  }

  set = (key, value) => async (transaction) => {
    const store = transaction.objectStore(this.storeName);
    await store.put(value, key);
  };

  delete = (key) => async (transaction) => {
    const store = transaction.objectStore(this.storeName);
    await store.delete(key);
  };

  get = (key) => async (transaction) => {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
}
