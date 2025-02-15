import React, {createContext, useEffect, useState} from 'react';
import {INITIAL_STATE} from 'domain/src/app/app.state.js';
import {wakeLockService} from "../../services/wakeLockService.js";
import {gongService} from "../../services/gongService.js";
import {tickingService} from "../../services/tickingService.js";
import {StateManager} from "./state-manager.js";

const stateManager = new StateManager(wakeLockService, gongService, tickingService);
const dispatch = stateManager.dispatch.bind(stateManager);
export const GlobalStateContext = createContext({
    state: INITIAL_STATE, dispatch
});

export const AppStateProvider = ({children}) => {
    const [state, setState] = useState(INITIAL_STATE);
    stateManager.setStateCallback(setState);
    useEffect(() => () => stateManager.cleanUp(), []);

    return (
        <GlobalStateContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalStateContext.Provider>
    );
};