import {createEventFactory} from "../../lib/event-factory.js";

export const moreMeditationTimeRequested = createEventFactory('moreMeditationTimeRequested');
export const lessMeditationTimeRequested = createEventFactory('lessMeditationTimeRequested');

export const morePreparationTimeRequested = createEventFactory('morePreparationTimeRequested');
export const lessPreparationTimeRequested = createEventFactory('lessPreparationTimeRequested');

export const gongToggled = createEventFactory('gongToggled');
