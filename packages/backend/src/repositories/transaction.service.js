export class TransactionService {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async executeInTransaction(transactionConsummer) {
        return await this.datasource.begin(transactionConsummer);
    }
}