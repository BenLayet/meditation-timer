export class KeyValueStorageService {
    constructor(keyValueStore, transactionService) {
        this.keyValueStore = keyValueStore;
        this.transactionService = transactionService;
    }
    async get(key) {
        return this.transactionService.runReadTransaction([this.keyValueStore.storeName], 
            this.keyValueStore.get(key)
        );
    }
    async set(key, value) {
        return this.transactionService.runWriteTransaction([this.keyValueStore.storeName], 
            this.keyValueStore.set(key, value)
        );
    }
    async delete(key) {
        return this.transactionService.runWriteTransaction([this.keyValueStore.storeName], 
            this.keyValueStore.delete(key)
        );
    }
}