export class TransactionService {
  constructor(datasource) {
    this.datasource = datasource;
  }

  async executeInTransaction(transactionConsumer) {
    return await this.datasource.begin(transactionConsumer);
  }
}
