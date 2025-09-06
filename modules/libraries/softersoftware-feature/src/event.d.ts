import { State } from "./state";
import { Value } from "./value";

export type Event<FeatureState extends State, Payload extends Value = Value>  = {
  eventType: string;
  payloadShape?: Payload;
  handler?: ({payload:Payload, state:FeatureState}) => FeatureState;
  isNewCycle?: boolean;
};
