import { State } from "./state";
import { Value } from "./value";

export type Selector<FeatureState extends State, V extends Value = Value> = (state: FeatureState) => V;