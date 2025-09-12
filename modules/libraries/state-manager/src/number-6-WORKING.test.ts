import { z, ZodType } from "zod";
import { expect, it } from "vitest";

export type State =
  | string
  | number
  | boolean
  | null
  | { [key: string]: State }
  | State[];

// Strict event definition map
type EventDefinitionMap = Record<string, ZodType>;

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

type EventsFromDefinition<
  EventMap extends EventDefinitionMap,
  ComponentState extends State,
> = {
  [K in Extract<keyof EventMap, string>]: Event<K, EventMap[K], ComponentState>;
}[Extract<keyof EventMap, string>];

type Component<
  EventMap extends EventDefinitionMap,
  ComponentState extends State,
> = {
  events: EventsFromDefinition<EventMap, ComponentState>[];
  initialState: ComponentState;
};

// Example Usage

const eventNames = ["clicked", "submitted"] as const;

const clickSchema = z.object({ x: z.number(), y: z.number() });
const submitSchema = z.object({ value: z.string() });

type MyEvents = {
  click: typeof clickSchema;
  submit: typeof submitSchema;
};

type MyState = { count: number };

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
  ],
};

const eventLogs: string[] = [];
let state = myComponent.initialState;

function createDispatchers<
  EventMap extends EventDefinitionMap,
  ComponentState extends State,
>(
  component: Component<EventMap, ComponentState>,
): {
  [K in Extract<keyof EventMap, string>]: (
    payload: z.infer<EventMap[K]>,
  ) => void;
} {
  const dispatchers = {} as {
    [K in Extract<keyof EventMap, string>]: (
      payload: z.infer<EventMap[K]>,
    ) => void;
  };
  for (const event of component.events) {
    // This cast is safe because we've constructed the types to match
    dispatchers[event.type as Extract<keyof EventMap, string>] = (
      payload: any,
    ) => {
      // @ts-expect-error - TypeScript can't fully infer here, but runtime is safe
      state = event.reducer(state, payload);
      eventLogs.push(event.type);
    };
  }
  return dispatchers;
}

it("should work", () => {
  const dispatchers = createDispatchers(myComponent);
  dispatchers.click({ x: 1, y: 2 });
  dispatchers.submit({ value: "100" });

  expect(eventLogs).to.deep.equal(["click", "submit"]);
  expect(state.count).to.equal(103);
});
