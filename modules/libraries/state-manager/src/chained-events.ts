import { isEqual } from "lodash-es";
import { createEvent } from "./create-event.js";
import { getStateAtPath } from "./state.js";
import {
  validateNotEmptyString,
  validateNotNullObject,
} from "@softersoftware/functions/assert.functions.js";
import type { Component, StateEvent } from "./types.js";

interface ChainedEventConfig {
  thenDispatch: any;
  withPayload?: (arg: { previousPayload: any; state: any }) => any;
  onCondition?: (arg: { previousPayload: any; state: any }) => boolean;
}

const createChainedEventFactory =
  (currentComponentPath: string[]) =>
  ({ thenDispatch, withPayload, onCondition }: ChainedEventConfig) =>
  (previousEvent: StateEvent, globalState: any): StateEvent[] => {
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

const resolveComponentPath = (componentPath: string[], childComponentPath?: string[]): string[] => [
  ...componentPath,
  ...(childComponentPath ?? []),
];

const createOwnChainedEvents = (component: Component, componentPath: string[]) => {
  const chainedEvents = (component as any).chainedEvents ?? [];
  chainedEvents.forEach(({ onEvent, thenDispatch }: any) => {
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
  return (previousEvent: StateEvent, globalState: any): StateEvent[] =>
    ((component as any).chainedEvents ?? [])
      .filter(({ onEvent }: any) =>
        isEqual(
          resolveComponentPath(componentPath, onEvent.childComponentPath),
          previousEvent.componentPath,
        ),
      )
      .filter(({ onEvent }: any) => onEvent.eventType === previousEvent.eventType)
      .flatMap(createChainedEventFactory(componentPath))
      .flatMap((newEventFactory: any) =>
        newEventFactory(previousEvent, globalState),
      );
};

const createChildrenChainedEvents =
  (component: Component, componentPath: string[]) => (previousEvent: StateEvent, globalState: any): StateEvent[] => {
    return Object.entries(component.children ?? {}).flatMap(
      ([childName, childComponent]) =>
        eventChainFactory(childComponent, [...componentPath, childName])(
          previousEvent,
          globalState,
        ),
    );
  };

export const eventChainFactory =
  (component: Component, componentPath: string[] = []) =>
  (previousEvent: StateEvent, globalState: any): StateEvent[] => {
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
