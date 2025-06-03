import { newDb } from "pg-mem";
import fs from "fs";

const createSchemaSql = fs.readFileSync(
  "database/initdb/create-schema.sql",
  "utf-8",
);

const memoryDb = newDb(); // Create a new in-memory database
const client = memoryDb.adapters.createPgPromise();
await client.query(createSchemaSql);

// A custom datasource to work like the production `datasource`
export const pgMemDatasource = async (strings, ...values) => {
  // Combine the raw SQL (template strings) with $1, $2 etc...
  const text = strings.reduce(
    (prev, curr, i) => prev + curr + (i < values.length ? `$${i + 1}` : ""),
    "",
  );
  return client.query({ text, values });
};
pgMemDatasource.begin = async (transactionConsumer) => {
  await client.query("BEGIN");
  try {
    const result = await transactionConsumer(pgMemDatasource);
    await client.query("COMMIT");
    return result;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }
};

pgMemDatasource.end = () => console.log("shutting down pg-mem db");
