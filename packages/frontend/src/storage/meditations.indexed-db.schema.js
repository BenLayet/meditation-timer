export const MEDITATION_STORE_NAME = "meditations";
export const meditationsIndexedDbSchema = {
    name: "MeditationDB",
    changelog: [
        db => db.createObjectStore(MEDITATION_STORE_NAME, {
            keyPath: "localId",
            autoIncrement: true,
          })
    ],
};

