import ow from "ow";

export const persistentStateEvents = {
    persistentStateLoadRequested: {
        eventType: "persistentStateLoadRequested",
    },
    persistentStateLoaded: {
        eventType: "persistentStateLoaded",
        payloadShape: {
            checkStatusToken: ow.optional.string,
            email: ow.optional.string,
        },
    },
};
