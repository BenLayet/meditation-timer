import { z, ZodType } from "zod";
import { expect, it } from "vitest";

export type State =
  | string
  | number
  | boolean
  | null
  | { [key: string]: State }
  | State[];

// Define a map of event types to payload schemas
type EventDefinitionMap<EventTypes extends string> = {
  [K in EventTypes]: ZodType;
};

// The Event type is generic over the event type, payload schema, and component state
type Event<
  EventType extends string,
  PayloadSchema extends ZodType,
  ComponentState extends State,
> = {
  type: EventType;
  payloadSchema: PayloadSchema;
  reducer: (
    state: ComponentState,
    payload: z.infer<PayloadSchema>,
  ) => ComponentState;
};

// Build a union type for all events from the event map
type EventsFromDefinition<
  EventMap extends EventDefinitionMap<keyof EventMap>,
  ComponentState extends State,
> = {
  [K in keyof EventMap]: Event<K & string, EventMap[K], ComponentState>;
}[keyof EventMap];

// The Component type takes an event definitions map, and the state type
type Component<
  EventMap extends EventDefinitionMap<keyof EventMap>,
  ComponentState extends State,
> = {
  events: EventsFromDefinition<EventMap, ComponentState>[];
  initialState: ComponentState;
};

// ----- Example Usage -----

// Define specific payload schemas
const clickSchema = z.object({ x: z.number(), y: z.number() });
const submitSchema = z.object({ value: z.string() });

type MyEvents = {
  click: typeof clickSchema;
  submit: typeof submitSchema;
};

type MyState = { count: number };

// Now, each event in the array is strictly typed by its event type and payload
const myComponent: Component<MyEvents, MyState> = {
  initialState: { count: 0 },
  events: [
    {
      type: "click",
      payloadSchema: clickSchema,
      reducer: (state, payload) => ({
        count: state.count + payload.x + payload.y,
      }),
    },
    {
      type: "submit",
      payloadSchema: submitSchema,
      reducer: (state, payload) => ({
        count: state.count + parseInt(payload.value, 10),
      }),
    },
    // If you try to add an event type not in MyEvents, TypeScript will error.
  ],
};
