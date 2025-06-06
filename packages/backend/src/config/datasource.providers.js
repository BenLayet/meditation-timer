import {
  createDatasource,
  datasourceErrorCodes,
} from "../adapters/postgres.datasource.js";
import { TransactionService } from "../repositories/transaction.service.js";

export const datasourceProviders = {
  datasourceProperties: () => ({
    host: process.env["DATABASE_HOST"],
    port: process.env["DATABASE_PORT"],
    database: process.env["DATABASE_NAME"],
    username: process.env["DATABASE_USER"],
    password: process.env["DATABASE_PASSWORD"],
  }),
  datasource: ({ datasourceProperties }) =>
    createDatasource(datasourceProperties),
  datasourceErrorCodes: () => datasourceErrorCodes,
  transactionService: ({ datasource }) => new TransactionService(datasource),
};
