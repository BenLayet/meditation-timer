import type { Component, State } from "./view-model.js";
interface Event {
    eventType: string;
    componentPath: string[];
    payload: any;
}
export declare const componentReducer: (component: Component) => (state: State, event: Event) => State;
export {};
//# sourceMappingURL=create-reducers.d.ts.map