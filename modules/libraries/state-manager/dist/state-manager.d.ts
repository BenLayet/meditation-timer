export declare class StateManager {
    notifying: boolean;
    cycleEvents: any[];
    constructor(rootComponent: any);
    getRootVM(): import("./view-model.js").VM;
    addRootVMChangedListener(onRootVMChanged: any): void;
    removeRootVMChangedListener(onRootVMChanged: any): void;
    addEffect: (effect: any) => void;
    removeEffect: (effect: any) => void;
    processEffects(event: any, previousState: any): void;
    addEventListener: (onEventOccurred: any) => void;
    removeEventListener: (onEventOccurred: any) => void;
    notifyEventOccurred(event: any, previousState: any): void;
    detectCycle(event: any): void;
    dispatch: (event: any) => void;
    forwardEvent(event: any): void;
}
