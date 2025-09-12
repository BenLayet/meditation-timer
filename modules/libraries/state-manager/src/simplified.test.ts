import { z, ZodType } from "zod";
import { expect, it } from "vitest";

export type State =
  | string
  | number
  | boolean
  | null
  | { [key: string]: State }
  | State[];

// An event: has a type, schema, and reducer
type Event<
  EventType extends string,
  Schema extends ZodType,
  S extends State,
> = {
  type: EventType;
  payloadSchema: Schema;
  reducer: (state: S, payload: z.infer<Schema>) => S;
};

// Map of event types to Zod schemas
type EventDefinitionMap = Record<string, ZodType>;

// A component: has an array of events and an initial state
type Component<EventMap extends EventDefinitionMap, S extends State> = {
  events: {
    [K in keyof EventMap]: Event<K, EventMap[K], S>;
  }[keyof EventMap][];
  initialState: S;
};

// Dispatcher creator: returns strongly typed dispatcher functions for each event type
function createDispatchers<
  EventMap extends EventDefinitionMap,
  S extends State,
>(
  component: Component<EventMap, S>,
  stateContainer: { state: S },
  eventLogs: string[],
): { [K in keyof EventMap]: (payload: z.infer<EventMap[K]>) => void } {
  const dispatchers = {} as {
    [K in keyof EventMap]: (payload: z.infer<EventMap[K]>) => void;
  };
  for (const ev of component.events) {
    dispatchers[ev.type as keyof EventMap] = (payload: any) => {
      stateContainer.state = ev.reducer(stateContainer.state, payload);
      eventLogs.push(ev.type);
    };
  }
  return dispatchers;
}

// Example Usage

const clickSchema = z.object({ x: z.number(), y: z.number() });
const submitSchema = z.object({ value: z.string() });

type MyEvents = {
  click: typeof clickSchema;
  submit: typeof submitSchema;
};

const initialState = { count: 0 };
const myComponent: Component<MyEvents, typeof initialState> = {
  initialState,
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
  ],
};

it("should work", () => {
  const eventLogs: string[] = [];
  const stateContainer = { state: myComponent.initialState };
  const dispatchers = createDispatchers(myComponent, stateContainer, eventLogs);
  dispatchers.click({ x: 1, y: 2 });
  dispatchers.submit({ value: "100" });

  expect(eventLogs).to.deep.equal(["click", "submit"]);
  expect(stateContainer.state.count).to.equal(103);
});
