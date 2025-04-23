export const meditationStoreName = "meditation";
export const pendingEventStoreName = "pendingEvent";
export const keyValueStoreName = "keyValue";
export const lastProcessedIdKey = "lastProcessedId";

export const meditationsIndexedDbSchema = {
    name: "MeditationDB",
    changelog: [
        db => db.createObjectStore(meditationStoreName, {
            keyPath: "localId",
            autoIncrement: true,
          }),
        db => db.createObjectStore(pendingEventStoreName, {
            keyPath: "localId",
            autoIncrement: true,
        }),
        db => db.createObjectStore(keyValueStoreName),
    ],
};

