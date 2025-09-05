import { map } from "@softersoftware/functions/object.functions.js";
import type { Component } from "./types.js";

export const getInitialState = (component: Component): any => ({
  ownState: component.initialState ?? {},
  children: map(component.children ?? {}, (child) => getInitialState(child)),
});
