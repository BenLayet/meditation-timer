export class StateManager {
    constructor(initialState) {
        this.state = initialState;
        this.onStateChanged = () => {        };
        this.localReducers = [];
        this.localEffects = [];
    }

    registerLocalReducers(reducers, localStateKey) {
        this.localReducers.push({reducers, localStateKey});
    }

    registerLocalEffects(effects, localStateKey) {
        this.localEffects.push({effects, localStateKey});
    }

    setStateChangedListener(onStateChanged) {
        this.onStateChanged = onStateChanged;
    }

    dispatch = (event) => {
        // reducers
        this.applyReducers(event);
        // notify state change
        this.onStateChanged(this.state);
        // side effects
        this.triggerEffects(event);
    }

    applyReducers(event) {
        let state = this.state;
        this.localReducers.forEach(({reducers, localStateKey}) => {
            const localState = localStateKey ? state[localStateKey] : state;
            const newLocalState = reducers(event, localState);
            state = localStateKey ? {
                ...state,
                [localStateKey]: newLocalState,
            } : newLocalState;
        });
        this.state = state;
    }

    triggerEffects(event) {
        let state = this.state;
        this.localEffects.forEach(({effects, localStateKey}) => {
            const localState = localStateKey ? state[localStateKey] : state;
            effects
                .filter(effect => effect.triggerEventType === event.type)
                .forEach(effect => effect.eventOccurred(event.payload, localState));
        });
    }

    cleanUp() {
        this.localEffects.forEach(({effects}) => effects.cleanUp && effects.cleanUp());
    }
}


