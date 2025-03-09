import React, {createContext, useEffect, useState} from 'react';
import {wakeLockService} from "../../services/wakeLockService.js";
import {gongService} from "../../services/gongService.js";
import {tickingService} from "../../services/tickingService.js";
import {StateManager} from "domain/src/lib/state-manager.js";
import {
    meditationTimerAppComponent
} from "domain/src/components/meditation-timer-app/meditation-timer-app.component.js";
import {meditationRepository} from "../../repositories/meditationRepository.js";
import {addDebugger, removeDebugger} from "../../lib/debug.functions.js";

const dependencies = {wakeLockService, gongService, tickingService, meditationRepository};
//STATE MANAGER
const stateManager = new StateManager(meditationTimerAppComponent, dependencies);
const dispatch = stateManager.dispatch;
const initialState = stateManager.getState();
export const AppStateContext = createContext({
    state: initialState, dispatch
});

export const AppStateProvider = ({children}) => {
    const [state, setState] = useState(initialState);
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