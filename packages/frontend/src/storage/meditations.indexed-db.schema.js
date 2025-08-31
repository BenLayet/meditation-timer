import {
  keyValueStoreName,
  meditationStoreName,
  pendingEventStoreName,
} from "./store-names.constants.js";
import { KeyValueStore } from "./key-value.store.js";
import { TransactionService } from "./transaction.service.js";

export const meditationsIndexedDbSchema = {
  name: "MeditationDB",
  changelog: [
    (db) =>
      db.createObjectStore(meditationStoreName, {
        keyPath: "uuid",
      }),
    (db) =>
      db.createObjectStore(pendingEventStoreName, {
        keyPath: "uuid",
      }),
    (db) => db.createObjectStore(keyValueStoreName),
    async (db) => {
      await new TransactionService(db).runWriteTransaction(
        [keyValueStoreName],
        async (transaction) => {
          const keyValueStore = new KeyValueStore(keyValueStoreName);
          const account = await keyValueStore.get("account")(transaction);
          if (account) {
            await keyValueStore.set("account", {
              login: account.login || account.email,
              token: account.token,
            })(transaction);
          }
        },
      );
    },
  ],
};
