import {INITIAL_STATE, validateAppState} from "domain/src/app/app.state.js";
import { appEffects } from "domain/src/app/app.effects.js";
import { appReducers } from "domain/src/app/app.reducers.js";

export class StateManager {
    constructor(
        wakeLockService,
        gongService,
        tickingService,
        ) {
        //GLOBAL STATE
        this.state = INITIAL_STATE;
        this.effects = appEffects(
            this.asyncDispatch.bind(this),
            wakeLockService,
            gongService,
            tickingService
        );
    }
    async asyncDispatch(event, delay = 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        this.dispatch(event);
    }
    setStateCallback(setState) {
        this.setState = setState;
    }

    dispatch(event) {
        // reducers
        this.state = appReducers(event, this.state);
        this.setState&&this.setState(this.state);
        // side effects
        this.effects
            .filter(effect => effect.triggerEventType === event.type)
            .forEach(effect => effect.eventOccurred(event.payload));
    }
    cleanUp() {
        this.effects.forEach(effect => effect.cleanUp && effect.cleanUp());
    }
}
