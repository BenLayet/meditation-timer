export class TransactionService {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async beginTransaction() {
        return this.datasource.begin();
    }
    async commitTransaction(transaction) {
        return transaction.commit();
    }
    async rollbackTransaction(transaction) {
        return transaction.rollback();
    }
    async executeInTransaction(runnable) {
        const transaction = await this.beginTransaction();
        try {
            const result = await runnable();
            await this.commitTransaction(transaction);
            return result;
        } catch (error) {
            await this.rollbackTransaction(transaction);
            throw error;
        }
    }
}