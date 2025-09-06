import { State } from "./state";
import { ChainedEvent } from "./chained-event";
import { Selector } from "./selector";
import { Event } from "./event";
export type Feature<FeatureState extends State = State> ={
  initialState?: FeatureState;
  children?: Record<string, Feature>;
  chainedEvents?: ChainedEvent<FeatureState>[];
  selectors?: Record<string, Selector<FeatureState>>;
  events?: Record<string, Event<FeatureState>>;
};