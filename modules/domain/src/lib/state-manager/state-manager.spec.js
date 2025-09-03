import { describe, expect, test } from "vitest";
import { StateManager } from "./state-manager.js";

describe("stateManager", () => {
  test("getRootComponent", () => {
    //given
    const selector1 = (compositeState) => compositeState.ownState.key1;
    const initialState = { key1: "value1" };
    const rootComponent = {
      initialState,
      selectors: { selector1 },
    };
    const stateManager = new StateManager(rootComponent);

    //when
    const actual = stateManager.getRootVM();
    const selected = actual.selectors.selector1();

    //then
    expect(selected).toBe("value1");
  });
});
