import React, {createContext, useEffect, useState} from 'react';
import {INITIAL_STATE} from 'domain/src/app/app.state.js';
import {wakeLockService} from "../../services/wakeLockService.js";
import {gongService} from "../../services/gongService.js";
import {tickingService} from "../../services/tickingService.js";
import {StateManager} from "domain/src/state-manager.js";
import {appEffects} from "domain/src/app/app.effects.js";
import {appReducers} from "domain/src/app/app.reducers.js";

const stateManager = new StateManager(INITIAL_STATE);
const dispatch = stateManager.dispatch;
const effects = appEffects(dispatch, wakeLockService, gongService, tickingService);
stateManager.registerLocalReducers(appReducers);
stateManager.registerLocalEffects(effects);

export const GlobalStateContext = createContext({
    state: INITIAL_STATE, dispatch
});

export const AppStateProvider = ({children}) => {
    const [state, setState] = useState(INITIAL_STATE);
    stateManager.setStateChangedListener(setState);
    useEffect(() => () => stateManager.cleanUp(), []);

    return (
        <GlobalStateContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalStateContext.Provider>
    );
};