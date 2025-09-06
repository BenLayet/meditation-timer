interface EffectParams {
    afterEvent: {
        eventType: string;
    };
    onComponent?: string[];
    then: (payload: any) => void;
}
interface Event {
    eventType: string;
    componentPath?: string[];
    payload?: any;
}
export declare const createEffect: ({ afterEvent, onComponent, then }: EffectParams) => (event: Event) => boolean | void;
export {};
