import {
  meditationStoreName,
  pendingEventStoreName,
  keyValueStoreName,
} from "./store-names.constants.js";

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
  ],
};
