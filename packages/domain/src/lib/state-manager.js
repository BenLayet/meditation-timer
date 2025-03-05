import ow from "ow";
import {featuresReducer} from "./create-reducers.js";
import {createChainedEventFactories} from "./chained-events.js";

export class StateManager {
    constructor(app, dependencies) {
        this.state = app.initialState;
        this.reducer = featuresReducer(app.features)
        this.chainedEventsFactories = createChainedEventFactories(app);
        this.initializeEffects(app.features, dependencies);
        this.eventListeners = [];
    }

    initializeEffects(features, dependencies) {
        ow(features, ow.object.valuesOfType(ow.object.partialShape({
            effects: ow.optional.function
        })));
        this.effectWithStateSelectors = Object.keys(features)
            .filter(key => features[key].effects)
            .map(key => features[key].effects(dependencies)
                .map(effect => ({effect, key})))
            .flat();
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
        this.effectWithStateSelectors
            .filter(({effect}) => effect.onEvent.eventType === event.eventType)
            .forEach(({effect, key}) => effect.then({
                payload: event.payload,
                dispatch: this.dispatch,
                state: this.state[key]
            }));
    }

    cleanUp() {
        this.effectWithStateSelectors.forEach(effect => effect.cleanUp && effect.cleanUp());
    }

}


