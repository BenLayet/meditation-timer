import { isEqual } from "lodash-es";
import {
  validateFunction,
  validateNotEmptyString,
  validateNotNullObject,
} from "@softersoftware/functions/assert.functions.js";
import type { StateEvent } from "./types.js";

interface EffectConfig {
  afterEvent: { eventType: string };
  onComponent?: string[];
  then: (payload: any) => void;
}

export const createEffect = ({ afterEvent, onComponent, then }: EffectConfig) => {
  validateNotNullObject({ afterEvent }, { afterEvent, onComponent, then });
  validateNotEmptyString(
    { triggeringEventType: afterEvent.eventType },
    { afterEvent, onComponent, then },
  );
  validateFunction({ then }, { afterEvent, onComponent, then });
  const triggeringEventType = afterEvent.eventType;
  const effectFunction = then;
  const componentPath = onComponent;
  return (event: StateEvent) =>
    isMatch(event, { triggeringEventType, componentPath }) &&
    effectFunction(event.payload);
};

const isMatch = (event: StateEvent, { triggeringEventType, componentPath }: { triggeringEventType: string; componentPath?: string[] }): boolean => {
  return (
    event.eventType === triggeringEventType &&
    (!componentPath || isEqual(componentPath, event.componentPath))
  );
};
