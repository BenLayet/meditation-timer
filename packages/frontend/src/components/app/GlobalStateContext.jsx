import React, { createContext, useState } from 'react';
import { appEffects } from 'domain/src/app/app.effects.js';
import { INITIAL_STATE } from 'domain/src/app/app.state.js';
import { appReducers } from 'domain/src/app/app.reducers.js';
import { wakeLockService } from '../../services/wakeLockService.js';
import { gongService } from '../../services/gongService.js';

export const GlobalStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [state, setState] = useState(INITIAL_STATE);

    const dispatch = (event) => {
        // reducers
        const newState = appReducers(event, state);
        setState(newState);
        // side effects
        const effects = appEffects(dispatch, wakeLockService, gongService);
        effects
            .filter(effect => effect.triggerEventType === event.type)
            .forEach(effect => effect.eventOccurred(event.payload));
    };

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};