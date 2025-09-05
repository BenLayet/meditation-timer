import { map } from "@softersoftware/functions/object.functions";
export const getInitialState = (component) => ({
    ownState: component.initialState ?? {},
    children: map(component.children ?? {}, (child) => getInitialState(child)),
});
