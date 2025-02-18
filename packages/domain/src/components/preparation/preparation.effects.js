import {preparationCompleted, preparationStartRequested} from "./preparation.events.js";
import {preparationSelectors} from "./preparation.selectors.js";
import {floor} from "lodash-es";

//TODO remove Date.now to be able to test
const onTimeUp = (dispatch) => (currentTimeInSeconds) => dispatch(preparationCompleted(currentTimeInSeconds));
const callCompletedLater = (timeoutService) => ({dispatch, state}) =>
    timeoutService.setTimeout(onTimeUp(dispatch), preparationSelectors.durationInSeconds(state));


export const preparationEffects = ({timeoutService}) => [
    {
        onEvent: preparationStartRequested,
        then: callCompletedLater(timeoutService),
        cleanUp: () => timeoutService.clearTimeout(),
    },
    {
        onEvent: preparationCompleted,
        then: () => timeoutService.clearTimeout(),
    },
];
