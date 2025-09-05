import ow from "ow";
import { componentReducer } from "./create-reducers.js";
import { eventChainFactory } from "./chained-events.js";
import { getInitialState } from "./initial-state.js";
import { getVM } from "./view-model.js";
import type { Component, StateEvent, Effect, EventListener, ViewModel } from "./types.js";

export class StateManager {
  notifying = false;
  cycleEvents: string[] = [];
  private rootComponent: Component;
  private state: any;
  private eventListeners: EventListener[] = [];
  private effects: Effect[] = [];
  private rootComponentListeners: ((vm: ViewModel) => void)[] = [];

  constructor(rootComponent: Component) {
    this.rootComponent = rootComponent;
    this.state = getInitialState(rootComponent);
  }

  getRootVM(): ViewModel {
    return getVM(this.rootComponent, this.state, this.dispatch);
  }

  addRootVMChangedListener(onRootVMChanged: (vm: ViewModel) => void): void {
    ow(onRootVMChanged, ow.function);
    onRootVMChanged(this.getRootVM());
    this.rootComponentListeners.push(onRootVMChanged);
  }

  removeRootVMChangedListener(onRootVMChanged: (vm: ViewModel) => void): void {
    this.rootComponentListeners = [
      ...this.rootComponentListeners.filter((l) => l !== onRootVMChanged),
    ];
  }

  //effects
  addEffect = (effect: Effect): void => {
    ow(effect, ow.function);
    this.effects.push(effect);
  };

  removeEffect = (effect: Effect): void => {
    this.effects = [...this.effects.filter((l) => l !== effect)];
  };

  processEffects(event: StateEvent, previousState: any): void {
    this.effects.forEach((effect) => effect(event, this.state, previousState));
  }

  //event listeners
  addEventListener = (onEventOccurred: EventListener): void => {
    ow(onEventOccurred, ow.function);
    this.eventListeners.push(onEventOccurred);
  };

  removeEventListener = (onEventOccurred: EventListener): void => {
    this.eventListeners = [
      ...this.eventListeners.filter((listener) => listener !== onEventOccurred),
    ];
  };

  notifyEventOccurred(event: StateEvent, previousState: any): void {
    this.eventListeners.forEach((onEventOccurred) => {
      try {
        onEventOccurred(event, this.state, previousState);
      } catch (e: any) {
        console.error(`Error in event listener: ${e.message}`);
        console.error(e);
      }
    });
    this.rootComponentListeners.forEach((onRootVMChanged) =>
      onRootVMChanged(this.getRootVM()),
    );
  }

  detectCycle(event: StateEvent): void {
    if (event.isNewCycle) {
      this.cycleEvents = [];
    }
    const eventIdentifier =
      event.componentPath.join(".") + "#" + event.eventType;
    if (this.cycleEvents.includes(eventIdentifier)) {
      console.error(
        `Cycle detected with new event ${eventIdentifier}:`,
        this.cycleEvents,
      );
      throw Error(`event in cycle: eventIdentifier=${eventIdentifier}`);
    }
    this.cycleEvents = [...this.cycleEvents, eventIdentifier];
  }

  dispatch = (event: StateEvent): void => {
    //assert not notifying
    if (this.notifying)
      throw Error(
        `event dispatched by event listener: eventType=${event.eventType}`,
      );

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

  forwardEvent(event: StateEvent): void {
    const eventChain = eventChainFactory(this.rootComponent);
    eventChain(event, this.state).forEach(this.dispatch);
  }
}
