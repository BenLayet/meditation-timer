import {isEqual} from "lodash-es";

const createEffect = (effectFunction, triggeringEvent, componentPath) =>
    (event) => {
        if (event.eventType === triggeringEvent.eventType
            && (!componentPath || isEqual(componentPath, event.componentPath))) {
            effectFunction(event);
        }
    }

export class Effects {
    effects = [];

    add({afterEvent, onComponent, then}) {
        this.effects.push(createEffect(then, afterEvent, onComponent));
    }

    get() {
        return this.effects;
    }
}