import ow from "ow";
import {componentReducer} from "./create-reducers.js";
import {createChainedEventFactories} from "./chained-events.js";
import {getInitialState} from "./initial-state.js";
import {getVM} from "./view-model.js";

export class StateManager {
    constructor(rootComponent) {
        this.rootComponent = rootComponent;
        this.state = getInitialState(rootComponent);
        this.eventListeners = [];
        this.rootComponentListeners = [];
    }

    getRootVM() {
        return getVM(this.rootComponent, this.state, this.dispatch);
    }

    addRootVMChangedListener(onRootVMChanged) {
        ow(onRootVMChanged, ow.function);
        this.rootComponentListeners.push(onRootVMChanged);
    }

    removeRootVMChangedListener(onRootVMChanged) {
        this.rootComponentListeners = [...this.rootComponentListeners.filter(l => !l === onRootVMChanged)];
    }

    addEventListener = (onEventOccurred) => {
        ow(onEventOccurred, ow.function);
        this.eventListeners.push(onEventOccurred);
    }

    removeEventListener = (onEventOccurred) => {
        this.eventListeners = [...this.eventListeners.filter(l => !l === onEventOccurred)];
    }

    notifyEventOccurred(event, oldState) {
        this.eventListeners.forEach(onEventOccurred => onEventOccurred(event, this.state, oldState));
        this.rootComponentListeners.forEach(onRootVMChanged => onRootVMChanged(this.getRootVM()));
    }

    dispatch = (event) => {
        // reducers
        const previousState = this.state;
        this.state = componentReducer(this.rootComponent)(previousState, event);

        // notify state change
        this.notifyEventOccurred(event, previousState);

        //forward event
        this.forwardEvent(event);

    }

    forwardEvent(event) {
        const chainedEventFactories = createChainedEventFactories(this.rootComponent);
        chainedEventFactories(event, this.state).forEach(this.dispatch);
    }


}


