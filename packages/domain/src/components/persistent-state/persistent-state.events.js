import ow from "ow";

export const persistentStateEvents = {
    persistentStateLoadRequested: {
        eventType: "persistentStateLoadRequested",
    },
    persistentStateLoaded: {
        eventType: "persistentStateLoaded",
        payloadShape: {
            createUserToken: ow.optional.string,
        },
    },
};
