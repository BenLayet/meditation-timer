export class TransactionService {
  private datasource: any;

  constructor(datasource: any) {
    this.datasource = datasource;
  }

  async executeInTransaction(transactionConsumer: any): Promise<any> {
    return await this.datasource.begin(transactionConsumer);
  }
}
