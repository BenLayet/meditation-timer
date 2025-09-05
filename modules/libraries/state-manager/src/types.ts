// Core types for the state manager library

export interface StateEvent {
  componentPath: string[];
  eventType: string;
  payload: any;
  isNewCycle: boolean;
}

export interface EventDefinition {
  eventType: string;
  payloadShape?: any;
  isNewCycle?: boolean;
  handler?: (state: any, payload: any) => any;
}

export interface Selector<TState = any, TResult = any> {
  (state: TState): TResult;
}

export interface Component {
  selectors?: Record<string, Selector>;
  events?: Record<string, EventDefinition>;
  children?: Record<string, Component>;
  reducers?: any;
  initialState?: any;
}

export interface ViewModel {
  selectors: Record<string, () => any>;
  dispatchers: Record<string, (payload?: any) => void>;
  children: Record<string, ViewModel>;
}

export type StateReducer = (state: any, event: StateEvent) => any;
export type Effect = (event: StateEvent, currentState: any, previousState: any) => void;
export type EventListener = (event: StateEvent, currentState: any, previousState: any) => void;
export type DispatchFunction = (event: StateEvent) => void;