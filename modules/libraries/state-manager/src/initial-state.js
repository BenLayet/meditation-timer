import { map } from "@softer-software/functions/object.functions.js";

export const getInitialState = (component) => ({
  ownState: component.initialState ?? {},
  children: map(component.children ?? {}, (child) => getInitialState(child)),
});
