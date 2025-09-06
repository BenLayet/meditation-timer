import type { Component, State } from "./view-model";
interface Event {
    eventType: string;
    componentPath: string[];
    payload: any;
}
export declare const componentReducer: (component: Component) => (state: State, event: Event) => State;
export {};
