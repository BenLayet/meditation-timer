export class KeyValueStore {
  constructor(indexedDb, storeName) {
    this.storeName = storeName;
    this.db = indexedDb;
  }

  async put(key, value) {
    const tx = this.db.transaction(this.storeName, "readwrite");
    const store = tx.objectStore(this.storeName);
    await store.put(value, key);
    await tx.done;
  }
  async get(key) {
    const tx = this.db.transaction(this.storeName, "readonly");
    const store = tx.objectStore(this.storeName);
    return await store.get(key);
  }
}
