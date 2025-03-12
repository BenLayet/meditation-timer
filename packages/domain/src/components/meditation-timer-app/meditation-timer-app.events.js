import ow from "ow";

const VALID_PAGES = ['HOME', 'MEDITATION_SESSION', 'STATISTICS']

export const meditationTimerAppEvents = {
    navigationRequested: {
        eventType: "navigationRequested",
        payloadShape: {page: ow.string.oneOf(VALID_PAGES)},
        handler: (state, {page}) => ({...state, currentPage: page}),
    },
    gongPlayRequested: {
        eventType: "gongPlayRequested",
    },
    gongStopRequested: {
        eventType: "gongStopRequested",
    },
};
