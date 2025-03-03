import ow from "ow";


function wrapComponentReducers(key, componentReducer) {
    return (event, state) => ({
            ...state,
            [key]: componentReducer(event, state[key])
        }
    );
}

export class StateManager {
    constructor(app, dependencies) {
        this.state = app.initialState;
        this.initializeReducers(app.components);
        this.eventForwarders = app.eventForwarders;
        this.initializeEffects(app.components, dependencies);
        this.eventListeners = [];
    }

    initializeReducers(components) {
        ow(components, ow.object.valuesOfType(ow.object.partialShape({
            reducers: ow.optional.function
        })));
        this.reducers = Object.keys(components)
            .filter(key => components[key].reducers)
            .map(key => wrapComponentReducers(key, components[key].reducers));
    }

    initializeEffects(components, dependencies) {
        ow(components, ow.object.valuesOfType(ow.object.partialShape({
            effects: ow.optional.function
        })));
        this.effectWithStateSelectors = Object.keys(components)
            .filter(key => components[key].effects)
            .map(key => components[key].effects(dependencies)
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
        const oldState = this.state;
        const newState = this.getNewState(event);
        this.state = newState;

        // notify state change
        this.notifyStateChanged(newState, event, oldState);

        //component to component interactions
        this.forwardEvent(event);

        // side effects
        this.triggerEffects(event);
    }

    getNewState(event) {
        return this.reducers.reduce((state, reducer) => reducer(event, state), this.state)
    }

    forwardEvent(event) {
        this.eventForwarders
            .filter(({onEvent}) => onEvent.eventType === event.eventType)
            .filter(({thenDispatch}) => !!thenDispatch)
            .forEach(({thenDispatch}) =>
                this.dispatch(thenDispatch({previousPayload: event.payload, state: this.state}))
            );
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


