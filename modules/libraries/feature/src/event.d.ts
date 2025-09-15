import { State } from "./state";
import { Value } from "./value";

export type Event<FeatureState extends State, Payload extends Value = Value> = {
  sanitizePayload?: (payload: Payload) => Payload;
  handler?: (payload: Payload) => (state: FeatureState) => FeatureState;
  isNewCycle?: boolean;
};
export type Events<FeatureState extends State> = Record<
  string,
  Event<FeatureState>
>;
