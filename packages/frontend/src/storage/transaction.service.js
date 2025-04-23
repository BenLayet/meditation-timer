export class TransactionService {
  constructor(indexedDb) {
    this.indexedDb = indexedDb;
  }

  async runTransaction(storeNames, mode, callback) {
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
  async runReadTransaction(storeNames, callback) {
    return this.runTransaction(storeNames, "readonly", callback);
  }
  async runWriteTransaction(storeNames, callback) {
    return this.runTransaction(storeNames, "readwrite", callback);
  }

}
