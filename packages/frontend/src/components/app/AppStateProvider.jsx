import React, {createContext, useEffect, useState} from 'react';
import {wakeLockService} from "../../services/wakeLockService.js";
import {gongService} from "../../services/gongService.js";
import {tickingService} from "../../services/tickingService.js";
import {StateManager} from "domain/src/lib/state-manager.js";
import {meditationTimerApp} from "domain/src/app/meditation-timer.app.js";
import {meditationRepository} from "../../repositories/meditationRepository.js";
import {addDebugger, removeDebugger} from "../../lib/debug.functions.js";

const dependencies = {wakeLockService, gongService, tickingService, meditationRepository};
//STATE MANAGER
const stateManager = new StateManager(meditationTimerApp, dependencies);
const dispatch = stateManager.dispatch;
export const AppStateContext = createContext({
    state: meditationTimerApp.initialState, dispatch
});

export const AppStateProvider = ({children}) => {
    const [state, setState] = useState(meditationTimerApp.initialState);
    useEffect(() => {
        addDebugger(stateManager, setState);
        return removeDebugger(stateManager);
    }, []);
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