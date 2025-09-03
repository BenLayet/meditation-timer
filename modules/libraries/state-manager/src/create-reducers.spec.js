import { describe, expect, test } from "vitest";
import { componentReducer } from "./create-reducers.js";

describe("create reducers", () => {
  test("create own reducer", () => {
    //given
    const component = {
      events: {
        eventOneOccurred: {
          handler: (state, payload) => ({ ...state, ...payload }),
        },
      },
    };
    const ownState = { key1: "value1" };
    const state = { ownState };
    const event = {
      eventType: "eventOneOccurred",
      payload: { key2: "value2" },
      componentPath: [],
    };

    //when
    const actual = componentReducer(component)(state, event);

    //then
    expect(actual).toEqual({ ownState: { key1: "value1", key2: "value2" } });
  });

  test("create child reducer", () => {
    //given
    const child1 = {
      events: {
        eventOneOccurred: {
          handler: (state, payload) => ({ ...state, ...payload }),
        },
      },
    };
    const component = {
      children: { child1 },
    };
    const ownState = { key1: "value1" };
    const state = {
      children: { child1: { ownState } },
    };
    const event = {
      eventType: "eventOneOccurred",
      payload: { key2: "value2" },
      componentPath: ["child1"],
    };

    //when
    const actual = componentReducer(component)(state, event);

    //then
    expect(actual).toEqual({
      children: { child1: { ownState: { key1: "value1", key2: "value2" } } },
    });
  });
});
