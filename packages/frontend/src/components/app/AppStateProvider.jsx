import React, {createContext, useEffect, useState} from 'react';
import {wakeLockService} from "../../services/wakeLockService.js";
import {gongService} from "../../services/gongService.js";
import {tickingService} from "../../services/tickingService.js";
import {StateManager} from "domain/src/lib/state-manager.js";
import {meditationTimerApp} from "domain/src/meditation-timer.app.js";
import {logEvent} from "domain/src/lib/logger.js";

const dependencies = {wakeLockService, gongService, tickingService};
//STATE MANAGER
const stateManager = new StateManager(meditationTimerApp, dependencies);
stateManager.addStateChangedListener(logEvent);
const dispatch = stateManager.dispatch;
export const AppStateContext = createContext({
    state: meditationTimerApp.initialState, dispatch
});

export const AppStateProvider = ({children}) => {
    const [state, setState] = useState(meditationTimerApp.initialState);
    useEffect(() => {
        stateManager.addStateChangedListener(setState);
        return () => stateManager.cleanUp()
    }, []);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    );
};