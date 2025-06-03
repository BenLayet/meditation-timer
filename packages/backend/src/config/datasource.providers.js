import { createDatasource } from "../adapters/postgres.datasource.js";
import { TransactionService } from "../repositories/transaction.service.js";

export const datasourceProviders = {
  datasourceProperties: () => ({
    host: process.env["DATABASE_HOST"],
    port: process.env["POSTGRES_PORT"],
    ssl: process.env["POSTGRES_SSL_MODE"],
    database: process.env["DATABASE_NAME"],
    username: process.env["DATABASE_USER"],
    password: process.env["DATABASE_PASSWORD"],
  }),
  datasource: ({ datasourceProperties }) =>
    createDatasource(datasourceProperties),
  transactionService: ({ datasource }) => new TransactionService(datasource),
};
