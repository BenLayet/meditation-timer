export class KeyValueStore {
  constructor(storeName) {
    this.storeName = storeName;
  }

  put = (key, value) => async (transaction) => {
    const store = transaction.objectStore(this.storeName);
    await store.put(value, key);
  };
  get = (key) => async (transaction) => {
    const store = transaction.objectStore(this.storeName);
    return await store.get(key);
  };
}
