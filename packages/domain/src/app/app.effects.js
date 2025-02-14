import {meditationSessionEffects} from "../meditation-session/meditation-session.effects.js";

export const appEffects = (dispatch, wakeLockService, gongService) => [
    ...meditationSessionEffects(dispatch, wakeLockService, gongService),
];

