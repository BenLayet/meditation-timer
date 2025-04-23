export class TransactionService {
  constructor(indexedDb) {
    this.indexedDb = indexedDb;
  }

  async runTransaction(stores, mode, callback) {
    const storeNames = stores.map((store) => store.storeName);
    const transaction = this.indexedDb.transaction(storeNames, mode);
    try {
      const result = await callback(transaction);
      await transaction.done;
      return result;
    } catch (error) {
      console.error("Transaction failed", error);
      throw error;
    }
  }
  async runReadTransaction(stores, callback) {
    return this.runTransaction(stores, "readonly", callback);
  }
  async runWriteTransaction(stores, callback) {
    return this.runTransaction(stores, "readwrite", callback);
  }

}
