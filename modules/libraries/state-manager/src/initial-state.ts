import { map } from "@softersoftware/functions/object.functions";
export const getInitialState = (component: any): any => ({
  ownState: component.initialState ?? {},
  children: map(component.children ?? {}, (child: any) =>
    getInitialState(child),
  ),
});
