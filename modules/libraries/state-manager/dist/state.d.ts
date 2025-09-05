import type { State } from "./view-model.js";
export declare const getStateAtPath: (globalState: State, componentPath: string[]) => State;
export declare const getOwnStateAtPath: (globalState: State, componentPath: string[]) => Record<string, unknown>;
export declare const getChildrenAtPath: (globalState: State, componentPath: string[]) => Record<string, State>;
export declare const writeStateAtPath: (globalState: State, componentPath: string[], localState: Record<string, unknown>) => State;
//# sourceMappingURL=state.d.ts.map