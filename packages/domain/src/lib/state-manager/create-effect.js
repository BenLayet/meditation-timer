import { isEqual } from "lodash-es";
import {
  validateFunction,
  validateNotEmptyString,
  validateNotNullObject,
} from "../../models/not-null.validator.js";

export const createEffect = ({ afterEvent, onComponent, then }) => {
  validateNotNullObject({ afterEvent });
  validateNotEmptyString({ triggeringEventType: afterEvent.eventType });
  validateFunction({ then });
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
