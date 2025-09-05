
import { map } from "@softersoftware/functions/object.functions";

interface Component {
  initialState?: Record<string, unknown>;
  children?: Record<string, Component>;
}

interface State {
  ownState: Record<string, unknown>;
  children: Record<string, State>;
}

export const getInitialState = (component: Component): State => ({
  ownState: component.initialState ?? {},
  children: map(component.children ?? {}, (child: Component) => getInitialState(child)),
});
