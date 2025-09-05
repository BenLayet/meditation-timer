import { isEqual } from "lodash-es";
import {
  validateFunction,
  validateNotEmptyString,
  validateNotNullObject,
} from "@softersoftware/functions/assert.functions";


interface EffectParams {
  afterEvent: { eventType: string };
  onComponent?: string[];
  then: (payload: any) => void;
}

interface Event {
  eventType: string;
  componentPath?: string[];
  payload?: any;
}

export const createEffect = ({ afterEvent, onComponent, then }: EffectParams): (event: Event) => boolean | void => {
  validateNotNullObject({ afterEvent }, { afterEvent, onComponent, then });
  validateNotEmptyString(
    { triggeringEventType: afterEvent.eventType },
    { afterEvent, onComponent, then },
  );
  validateFunction({ then }, { afterEvent, onComponent, then });
  const triggeringEventType = afterEvent.eventType;
  const effectFunction = then;
  const componentPath = onComponent;
  return (event: Event) =>
    isMatch(event, { triggeringEventType, componentPath }) &&
    effectFunction(event.payload);
};

const isMatch = (
  event: Event,
  { triggeringEventType, componentPath }: { triggeringEventType: string; componentPath?: string[] },
): boolean => {
  return (
    event.eventType === triggeringEventType &&
    (!componentPath || isEqual(componentPath, event.componentPath))
  );
};
