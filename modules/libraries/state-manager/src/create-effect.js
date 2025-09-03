import { isEqual } from "lodash-es";
import {
  validateFunction,
  validateNotEmptyString,
  validateNotNullObject,
} from "@softer-software/functions/assert.functions.js";

export const createEffect = ({ afterEvent, onComponent, then }) => {
  validateNotNullObject({ afterEvent }, { afterEvent, onComponent, then });
  validateNotEmptyString(
    { triggeringEventType: afterEvent.eventType },
    { afterEvent, onComponent, then },
  );
  validateFunction({ then }, { afterEvent, onComponent, then });
  const triggeringEventType = afterEvent.eventType;
  const effectFunction = then;
  const componentPath = onComponent;
  return (event) =>
    isMatch(event, { triggeringEventType, componentPath }) &&
    effectFunction(event.payload);
};

const isMatch = (event, { triggeringEventType, componentPath }) => {
  return (
    event.eventType === triggeringEventType &&
    (!componentPath || isEqual(componentPath, event.componentPath))
  );
};
