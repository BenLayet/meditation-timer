import ow from "ow";

const VALID_PAGES = ['HOME', 'MEDITATION_SESSION', 'STATISTICS']

export const navigationEvents = {
    navigationRequested: {page: ow.string.oneOf(VALID_PAGES)},
}