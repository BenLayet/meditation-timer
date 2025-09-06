export interface Component {
    selectors?: Record<string, (state: State) => unknown>;
    events?: Record<string, {
        payloadShape: any;
        eventType: string;
        isNewCycle?: boolean;
    }>;
    children?: Record<string, Component>;
    initialState?: Record<string, unknown>;
}
export interface State {
    ownState: Record<string, unknown>;
    children: Record<string, State>;
}
export interface VM {
    selectors: Record<string, () => unknown>;
    dispatchers: Record<string, (payload?: any) => void>;
    children: Record<string, VM>;
}
export declare const getVM: (component: Component, state: State, dispatch: (event: any) => void, componentPath?: string[]) => VM;
