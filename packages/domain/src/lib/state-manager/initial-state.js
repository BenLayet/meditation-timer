import {map} from "../functions/object.functions.js";

export const getInitialState = component => ({
    ownState: component.initialState ?? {},
    children: map(component.children ?? {}, child => getInitialState(child))
})