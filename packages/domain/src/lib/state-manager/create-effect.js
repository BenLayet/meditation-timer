import {isEqual} from "lodash-es";

export const createEffect = ({afterEvent, onComponent, then}) =>
    (event) => {
        const triggeringEvent = afterEvent;
        const componentPath = onComponent;
        const effectFunction = then;
        
        if (event.eventType === triggeringEvent.eventType
            && (!componentPath || isEqual(componentPath, event.componentPath))) {
            effectFunction(event.payload);
        }
    }