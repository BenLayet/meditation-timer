import ow from "ow";
import {featureReducer} from "./create-reducers.js";
import {createChainedEventFactories} from "./chained-events.js";
import {getInitialState} from "./initial-state.js";
import {featureEffects} from "./create-effects.js";

export class StateManager {
    constructor(app, dependencies) {
        this.state = getInitialState(app);
        this.reducer = featureReducer(app)
        this.chainedEventsFactories = createChainedEventFactories(app);
        this.effects = featureEffects(app, dependencies);
        this.eventListeners = [];
    }

    getState() {
        return {...this.state};
    }

    addStateChangedListener(onStateChanged) {
        ow(onStateChanged, ow.function);
        this.eventListeners.push(onStateChanged);
    }

    removeStateChangedListener(onStateChanged) {
        this.eventListeners = [...this.eventListeners.filter(l => !l === onStateChanged)];
    }

    notifyStateChanged(newState, event, oldState) {
        this.eventListeners.forEach(onStateChanged => onStateChanged(newState, event, oldState));
    }

    dispatch = (event) => {
        // reducers
        const previousState = this.state;
        const newState = this.reducer(event, previousState);
        this.state = newState;

        // notify state change
        this.notifyStateChanged(newState, event, previousState);

        //forward event
        this.forwardEvent(event);

        // side effects
        this.triggerEffects(event);
    }

    forwardEvent(event) {
        this.chainedEventsFactories(event, this.state).forEach(this.dispatch);
    }

    triggerEffects(event) {
        this.effects
            .filter((effect) => effect.onEvent.eventType === event.eventType)
            .forEach((effect) => effect.then({
                payload: event.payload,
                dispatch: this.dispatch,
                state: this.state
            }));
    }

    cleanUp() {
        this.effects.forEach(effect => effect.cleanUp && effect.cleanUp());
    }

}


