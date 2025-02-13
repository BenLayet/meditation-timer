import {isPreparationTimeUp} from "./meditation-session.selectors.js";

export const sessionStartRequestedEventHandler = async (dispatch) => {
    dispatch({event: 'PREPARATION_TIME_STARTED'});
}
export const preparationTimerTickedHandler = async (dispatch, state) => {
    if (isPreparationTimeUp(state)) {
        dispatch({event: 'PREPARATION_TIME_UP'});
    }
}
