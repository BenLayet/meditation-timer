import { isEqual } from "lodash-es";
import {
  validateFunction,
  validateNotEmptyString,
  validateNotNullObject,
} from "@softersoftware/functions/assert.functions";

export const createEffect = ({
  afterEvent,
  onComponent,
  then,
}: any): ((event: Event) => boolean | void) => {
  validateNotNullObject({ afterEvent }, { afterEvent, onComponent, then });
  validateNotEmptyString(
    { triggeringEventType: afterEvent.eventType },
    { afterEvent, onComponent, then },
  );
  validateFunction({ then }, { afterEvent, onComponent, then });
  const triggeringEventType = afterEvent.eventType;
  const effectFunction = then;
  const componentPath = onComponent;
  return (event: any) =>
    isMatch(event, { triggeringEventType, componentPath }) &&
    effectFunction(event.payload);
};

const isMatch = (
  event: any,
  {
    triggeringEventType,
    componentPath,
  }: { triggeringEventType: string; componentPath?: string[] },
): boolean => {
  return (
    event.eventType === triggeringEventType &&
    (!componentPath || isEqual(componentPath, event.componentPath))
  );
};
