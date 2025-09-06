interface Component {
    initialState?: Record<string, unknown>;
    children?: Record<string, Component>;
}
interface State {
    ownState: Record<string, unknown>;
    children: Record<string, State>;
}
export declare const getInitialState: (component: Component) => State;
export {};
