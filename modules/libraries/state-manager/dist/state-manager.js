import ow from "ow";
import { componentReducer } from "./create-reducers.js";
import { eventChainFactory } from "./chained-events.js";
import { getInitialState } from "./initial-state.js";
import { getVM } from "./view-model.js";
export class StateManager {
    notifying = false;
    cycleEvents = [];
    constructor(rootComponent) {
        this.rootComponent = rootComponent;
        this.state = getInitialState(rootComponent);
        this.eventListeners = [];
        this.effects = [];
        this.rootComponentListeners = [];
    }
    getRootVM() {
        return getVM(this.rootComponent, this.state, this.dispatch);
    }
    addRootVMChangedListener(onRootVMChanged) {
        ow(onRootVMChanged, ow.function);
        onRootVMChanged(this.getRootVM());
        this.rootComponentListeners.push(onRootVMChanged);
    }
    removeRootVMChangedListener(onRootVMChanged) {
        this.rootComponentListeners = [
            ...this.rootComponentListeners.filter((l) => !l === onRootVMChanged),
        ];
    }
    //effects
    addEffect = (effect) => {
        ow(effect, ow.function);
        this.effects.push(effect);
    };
    removeEffect = (effect) => {
        this.effects = [...this.effects.filter((l) => !l === effect)];
    };
    processEffects(event, previousState) {
        this.effects.forEach((effect) => effect(event, this.state, previousState));
    }
    //event listeners
    addEventListener = (onEventOccurred) => {
        ow(onEventOccurred, ow.function);
        this.eventListeners.push(onEventOccurred);
    };
    removeEventListener = (onEventOccurred) => {
        this.eventListeners = [
            ...this.eventListeners.filter((listener) => listener !== onEventOccurred),
        ];
    };
    notifyEventOccurred(event, previousState) {
        this.eventListeners.forEach((onEventOccurred) => {
            try {
                onEventOccurred(event, this.state, previousState);
            }
            catch (e) {
                console.error(`Error in event listener: ${e.message}`);
                console.error(e);
            }
        });
        this.rootComponentListeners.forEach((onRootVMChanged) => onRootVMChanged(this.getRootVM()));
    }
    detectCycle(event) {
        if (event.isNewCycle) {
            this.cycleEvents = [];
        }
        const eventIdentifier = event.componentPath.join(".") + "#" + event.eventType;
        if (this.cycleEvents.includes(eventIdentifier)) {
            console.error(`Cycle detected with new event ${eventIdentifier}:`, this.cycleEvents);
            throw Error(`event in cycle: eventIdentifier=${eventIdentifier}`);
        }
        this.cycleEvents = [...this.cycleEvents, eventIdentifier];
    }
    dispatch = (event) => {
        //assert not notifying
        if (this.notifying)
            throw Error(`event dispatched by event listener: eventType=${event.eventType}`);
        //cycle detection
        this.detectCycle(event);
        // reducers
        const previousState = this.state;
        this.state = componentReducer(this.rootComponent)(previousState, event);
        // notify state change
        this.notifying = true;
        this.notifyEventOccurred(event, previousState);
        this.notifying = false;
        //forward event
        this.forwardEvent(event);
        //process effects
        this.processEffects(event, previousState);
    };
    forwardEvent(event) {
        const eventChain = eventChainFactory(this.rootComponent);
        eventChain(event, this.state).forEach(this.dispatch);
    }
}
