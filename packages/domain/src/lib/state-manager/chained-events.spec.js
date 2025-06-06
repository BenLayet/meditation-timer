import { describe, expect, test } from "vitest";
import { eventChainFactory } from "./chained-events.js";
import ow from "ow";

const events = {
  event1Occurred: {
    eventType: "event1Occurred",
    payloadShape: { key1: ow.string },
  },
  event2Occurred: {
    eventType: "event2Occurred",
    payloadShape: { key1: ow.string },
  },
  event3Occurred: {
    eventType: "event3Occurred",
    payloadShape: { key1: ow.string, key2: ow.string, key3: ow.string },
  },
};

const simpleEventChain = {
  onEvent: events.event1Occurred,
  thenDispatch: events.event2Occurred,
};
const eventChainEvent1To3WithPayload = {
  onEvent: events.event1Occurred,
  thenDispatch: events.event3Occurred,
  withPayload: ({ previousPayload, state }) => ({
    ...previousPayload,
    key2: "constructed",
    key3: state.ownState.property1,
  }),
};
const eventChainEvent1To2OfChild1 = {
  onEvent: events.event1Occurred,
  thenDispatch: {
    ...events.event2Occurred,
    childComponentPath: ["child1"],
  },
};
const eventChain1FromChildTo2 = {
  onEvent: {
    ...events.event1Occurred,
    childComponentPath: ["child1"],
  },
  thenDispatch: events.event2Occurred,
};
const eventChainEvent1FromChild1To2OfChild2 = {
  onEvent: {
    ...events.event1Occurred,
    childComponentPath: ["child1"],
  },
  thenDispatch: {
    ...events.event2Occurred,
    childComponentPath: ["child2"],
  },
};

describe("createAllComponentEvents", () => {
  test("simple event chain: when event one occurs, event two with same payload should be dispatched", () => {
    //given
    const component = { chainedEvents: [simpleEventChain] };
    const previousEvent = {
      componentPath: [],
      eventType: "event1Occurred",
      payload: { key1: "value1" },
    };
    const state = {};
    const eventChain = eventChainFactory(component);

    //when
    const chainedEvents = eventChain(previousEvent, state);

    //then
    expect(chainedEvents).toEqual([
      {
        eventType: "event2Occurred",
        payload: { key1: "value1" },
        componentPath: [],
        isNewCycle: false,
      },
    ]);
  });
  test("event chain with payload: when event one occurs, event three with constructed payload should be created", () => {
    //given
    const component = { chainedEvents: [eventChainEvent1To3WithPayload] };
    const previousEvent = {
      componentPath: [],
      eventType: "event1Occurred",
      payload: { key1: "value1" },
    };
    const state = { ownState: { property1: "stateProperty1" } };

    //when
    const newEvents = eventChainFactory(component)(previousEvent, state);

    //then
    expect(newEvents).toEqual([
      {
        eventType: "event3Occurred",
        payload: {
          key1: "value1",
          key2: "constructed",
          key3: "stateProperty1",
        },
        componentPath: [],
        isNewCycle: false,
      },
    ]);
  });
  test("child-component with chain with payload: when event1Occurred on child1, child1 should dispatch event three with constructed payload based on child1 state", () => {
    //given
    const child1 = { chainedEvents: [eventChainEvent1To3WithPayload] };
    const component = { children: { child1 } };
    const previousEvent = {
      componentPath: ["child1"],
      eventType: "event1Occurred",
      payload: { key1: "value1" },
    };
    const child1State = { ownState: { property1: "stateProperty1" } };
    const state = { children: { child1: child1State } };
    const eventChain = eventChainFactory(component);

    //when
    const newEvents = eventChain(previousEvent, state);

    //then
    expect(newEvents).toEqual([
      {
        eventType: "event3Occurred",
        payload: {
          key1: "value1",
          key2: "constructed",
          key3: "stateProperty1",
        },
        componentPath: ["child1"],
        isNewCycle: false,
      },
    ]);
  });

  test("grand-child-component: when event one occurs, grand-child-components should dispatch event three with constructed payload based on child state", () => {
    //given
    const child2 = { chainedEvents: [eventChainEvent1To3WithPayload] };
    const child1 = { children: { child2 } };
    const component = { children: { child1 } };
    const previousEvent = {
      componentPath: ["child1", "child2"],
      eventType: "event1Occurred",
      payload: { key1: "value1" },
    };
    const child2State = { ownState: { property1: "stateProperty1" } };
    const child1State = { children: { child2: child2State } };
    const state = { children: { child1: child1State } };
    const eventChain = eventChainFactory(component);

    //when
    const newEvents = eventChain(previousEvent, state);

    //then
    expect(newEvents).toEqual([
      {
        eventType: "event3Occurred",
        payload: {
          key1: "value1",
          key2: "constructed",
          key3: "stateProperty1",
        },
        componentPath: ["child1", "child2"],
        isNewCycle: false,
      },
    ]);
  });

  test("dispatch to child", () => {
    //given
    const component = { chainedEvents: [eventChainEvent1To2OfChild1] };
    const previousEvent = {
      componentPath: [],
      eventType: "event1Occurred",
      payload: { key1: "value1" },
    };
    const state = {};
    const eventChain = eventChainFactory(component);

    //when
    const newEvents = eventChain(previousEvent, state);

    //then
    expect(newEvents).toEqual([
      {
        eventType: "event2Occurred",
        payload: { key1: "value1" },
        componentPath: ["child1"],
        isNewCycle: false,
      },
    ]);
  });

  test("dispatch from child", () => {
    //given
    const component = { chainedEvents: [eventChain1FromChildTo2] };
    const previousEvent = {
      componentPath: ["child1"],
      eventType: "event1Occurred",
      payload: { key1: "value1" },
    };
    const state = {};
    const eventChain = eventChainFactory(component);

    //when
    const newEvents = eventChain(previousEvent, state);

    //then
    expect(newEvents).toEqual([
      {
        eventType: "event2Occurred",
        payload: { key1: "value1" },
        componentPath: [],
        isNewCycle: false,
      },
    ]);
  });
  test("dispatch from child1 to child2", () => {
    //given
    const component = {
      chainedEvents: [eventChainEvent1FromChild1To2OfChild2],
    };
    const previousEvent = {
      componentPath: ["child1"],
      eventType: "event1Occurred",
      payload: { key1: "value1" },
    };
    const state = {};
    const eventChain = eventChainFactory(component);

    //when
    const newEvents = eventChain(previousEvent, state);

    //then
    expect(newEvents).toEqual([
      {
        eventType: "event2Occurred",
        payload: { key1: "value1" },
        componentPath: ["child2"],
        isNewCycle: false,
      },
    ]);
  });
});
