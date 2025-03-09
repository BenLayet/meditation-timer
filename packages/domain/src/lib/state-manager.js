import ow from "ow";
import {componentReducer} from "./create-reducers.js";
import {createChainedEventFactories} from "./chained-events.js";
import {getInitialState} from "./initial-state.js";
import {componentEffects} from "./create-effects.js";
import {actualMeditationEvents} from "../components/actual-meditation/actual-meditation.events.js";

export class StateManager {
    constructor(app, dependencies) {
        this.state = getInitialState(app);
        this.reducer = componentReducer(app)
        this.chainedEventsFactories = createChainedEventFactories(app);
        this.effects = componentEffects(app, dependencies);
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

    dispatch = (eventType, payload = {}) => {
        Object.entries(actualMeditationEvents)
            .filter(([, value]) => value === eventType)
            .map(([key]) => key)
            .forEach(console.log)

        //payload validation
        ow(payload, ow.object.exactShape(eventType));
        const event = {eventType, payload};

        // reducers
        const previousState = this.state;
        this.state = this.reducer(previousState, event);

        // notify state change
        this.notifyStateChanged(this.state, event, previousState);

        //forward event
        this.forwardEvent(event);

        // side effects
        this.triggerEffects(event);
    }

    forwardEvent(event) {
        this.chainedEventsFactories(event, this.state).forEach((event) => this.dispatch(event.eventType, event.payload));
    }

    triggerEffects(event) {
        this.effects
            .filter((effect) => effect.onEvent === event.eventType)
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


