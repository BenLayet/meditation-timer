export class CollectionStore {
  constructor(storeName) {
    this.storeName = storeName;
  }
  add = (item) => async (transaction) => {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.add(item);
      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(`${this.storeName} add error: ${request.error}`);
    });
  };
  getAll = async (transaction) => {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject(`${this.storeName} getAll error: ${request.error}`);
    });
  };

  existsById = (id) => async (transaction) => {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(!!request.result); // Return true if the record exists
      request.onerror = () =>
        reject(`${this.storeName} existsById error: ${request.error}`);
    });
  };

  get = (key, defaultValue) => async (transaction) => {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);
      request.onsuccess = () =>
        resolve(
          typeof request.result === "undefined" ? defaultValue : request.result,
        );
      request.onerror = () => reject(request.error);
    });
  };

  deleteById = (id) => async (transaction) => {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };
  deleteAll = () => async (transaction) => {
    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };
}
