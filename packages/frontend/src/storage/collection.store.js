export class CollectionStore {
  constructor(storeName) {
    this.storeName = storeName;
  }
  async add(transaction, item) {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.add(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  async getAll(transaction) {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async getById(transaction, id) {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id)
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
