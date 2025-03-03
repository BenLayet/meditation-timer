import {createEventFactory} from "../../lib/event-factory.js";
import ow from "ow";

const VALID_PAGES= ['HOME', 'MEDITATION_SESSION', 'STATISTICS']

export const navigationRequested = createEventFactory('goToPageRequested', (page)=>{
    ow(page, ow.string.oneOf(VALID_PAGES));
    return {page};
});