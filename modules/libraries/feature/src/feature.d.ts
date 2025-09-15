import { Events } from "./event";
import { State } from "./state";
import { ChainedEvent } from "./chained-event";
import { Selector } from "./selector";

export type Feature<FeatureState extends State = State> = {
  initialState?: FeatureState;
  events?: Events<FeatureState>;
  children?: Record<string, Feature>;
  chainedEvents?: ChainedEvent<FeatureState>[];
  selectors?: Record<string, Selector<FeatureState>>;
};
