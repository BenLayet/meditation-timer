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
    async (db, upgradeTransaction) => {
      const keyValueStore = new KeyValueStore(keyValueStoreName);
      const account = await keyValueStore.get("account")(upgradeTransaction);
      if (account) {
        await keyValueStore.set("account", {
          login: account.login || account.email,
          userToken: account.userToken,
        })(upgradeTransaction);
      }
    },
  ],
};
