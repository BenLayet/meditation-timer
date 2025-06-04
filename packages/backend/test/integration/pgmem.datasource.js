import { newDb } from "pg-mem";
import fs from "fs";
import { datasourceProviders } from "../../src/config/datasource.providers.js";
import { datasourceErrorCodes } from "../../src/adapters/postgres.datasource.js";

const createSchemaSql = fs.readFileSync(
  "database/initdb/create-schema.sql",
  "utf-8",
);

const memoryDb = newDb(); // Create a new in-memory database
const pgMemClient = memoryDb.adapters.createPgPromise();
const mapPgMemError = (error) => {
  if (error.message.includes("violates foreign key constraint")) {
    return { ...error, code: datasourceErrorCodes.FOREIGN_KEY_VIOLATION };
  }
  return error;
};
const client = {
  query: async (q) => {
    try {
      return await pgMemClient.query(q);
    } catch (error) {
      throw mapPgMemError(error);
    }
  },
};
await client.query(createSchemaSql);

// A custom datasource to work like the production `datasource`
const datasource = async (strings, ...values) => {
  // Combine the raw SQL (template strings) with $1, $2 etc...
  const text = strings.reduce(
    (prev, curr, i) => prev + curr + (i < values.length ? `$${i + 1}` : ""),
    "",
  );
  return client.query({ text, values });
};
datasource.begin = async (transactionConsumer) => {
  await client.query("BEGIN");
  try {
    const result = await transactionConsumer(datasource);
    await client.query("COMMIT");
    return result;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }
};
datasource.end = () => console.log("shutting down pg-mem db");

export const testDatasourceProviders = { ...datasourceProviders };
delete testDatasourceProviders.datasourceProperties;
testDatasourceProviders.datasource = () => datasource;
