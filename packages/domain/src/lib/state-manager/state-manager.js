import ow from "ow";
import {componentReducer} from "./create-reducers.js";
import {createChainedEventFactories} from "./chained-events.js";
import {getInitialState} from "./initial-state.js";
import {getVM} from "./view-model.js";

export class StateManager {
    constructor(rootComponent) {
        this.rootComponent = rootComponent;
        this.state = getInitialState(rootComponent);
        this.stateListeners = [];
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

    addStateChangedListener(onStateChanged) {
        ow(onStateChanged, ow.function);
        this.stateListeners.push(onStateChanged);
    }

    removeStateChangedListener(onStateChanged) {
        this.stateListeners = [...this.stateListeners.filter(l => !l === onStateChanged)];
    }

    notifyStateChanged(newState, event, oldState) {
        this.stateListeners.forEach(onStateChanged => onStateChanged(newState, event, oldState));
        this.rootComponentListeners.forEach(onRootVMChanged => onRootVMChanged(this.getRootVM()));
    }

    dispatch = (event) => {
        // reducers
        const previousState = this.state;
        const reducer = componentReducer(this.rootComponent);
        this.state = reducer(previousState, event);

        // notify state change
        this.notifyStateChanged(this.state, event, previousState);

        //forward event
        this.forwardEvent(event);

    }

    forwardEvent(event) {
        const chainedEventFactories = createChainedEventFactories(this.rootComponent);
        chainedEventFactories(event, this.state).forEach(this.dispatch);
    }


}


