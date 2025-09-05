interface CreateEventParams {
    payloadShape: Record<string, any>;
    eventType: string;
    isNewCycle?: boolean;
}
export declare const createEvent: ({ payloadShape, eventType, isNewCycle }: CreateEventParams, componentPath: string[], payload: Record<string, any>) => {
    componentPath: string[];
    eventType: string;
    payload: Record<string, any>;
    isNewCycle: boolean;
};
export {};
//# sourceMappingURL=create-event.d.ts.map