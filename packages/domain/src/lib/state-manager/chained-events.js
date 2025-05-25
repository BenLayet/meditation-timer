import { isEqual } from "lodash-es";
import { createEvent } from "./create-event.js";
import { getStateAtPath } from "./state.js";
import {
  validateNotEmptyString,
  validateNotNullObject,
} from "../../models/not-null.validator.js";

const createChainedEventFactory =
  (currentComponentPath) =>
  ({ thenDispatch, withPayload, onCondition }) =>
  (previousEvent, globalState) => {
    const previousPayload = previousEvent.payload;
    const state = getStateAtPath(globalState, currentComponentPath);
    const argument = { previousPayload, state };
    if (onCondition && !onCondition(argument)) {
      return [];
    } else {
      const payload = withPayload
        ? withPayload(argument)
        : previousEvent.payload;
      const componentPath = resolveComponentPath(
        currentComponentPath,
        thenDispatch.childComponentPath,
      );
      return [createEvent(thenDispatch, componentPath, payload)];
    }
  };
const resolveComponentPath = (componentPath, childComponentPath) => [
  ...componentPath,
  ...(childComponentPath ?? []),
];

const createOwnChainedEvents = (component, componentPath) => {
  component.chainedEvents.forEach(({ onEvent, thenDispatch }) => {
    validateNotNullObject({ onEvent }, { componentPath });
    validateNotEmptyString(
      { "onEvent.eventType": onEvent.eventType },
      { componentPath },
    );
    validateNotNullObject({ thenDispatch }, { componentPath });
    validateNotEmptyString(
      {
        "thenDispatch.eventType": thenDispatch.eventType,
      },
      { componentPath },
    );
  });
  return (previousEvent, globalState) =>
    (component.chainedEvents ?? [])
      .filter(({ onEvent }) =>
        isEqual(
          resolveComponentPath(componentPath, onEvent.childComponentPath),
          previousEvent.componentPath,
        ),
      )
      .filter(({ onEvent }) => onEvent.eventType === previousEvent.eventType)
      .flatMap(createChainedEventFactory(componentPath))
      .flatMap((newEventFactory) =>
        newEventFactory(previousEvent, globalState),
      );
};

const createChildrenChainedEvents =
  (component, componentPath) => (previousEvent, globalState) => {
    return Object.entries(component.children ?? {}).flatMap(
      ([childName, childComponent]) =>
        eventChainFactory(childComponent, [...componentPath, childName])(
          previousEvent,
          globalState,
        ),
    );
  };
export const eventChainFactory =
  (component, componentPath = []) =>
  (previousEvent, globalState) => {
    const childrenEvents = createChildrenChainedEvents(
      component,
      componentPath,
    )(previousEvent, globalState);
    const ownEvents = createOwnChainedEvents(component, componentPath)(
      previousEvent,
      globalState,
    );
    return [...childrenEvents, ...ownEvents];
  };
