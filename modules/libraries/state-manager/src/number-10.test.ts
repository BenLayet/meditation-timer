import { z, ZodType } from "zod";

// The State type can be anything (for simplicity)
type State = Record<string, any>;
type Payload = Record<string, any>;
// This generic infers the correct reducer signature for each event
type Event<S extends State, P extends Payload> = {
  sanitizePayload: (payload: P) => P;
  reducer: (state: S, payload: P) => S;
};
type Events<ComponentState extends State> = Record<
  string,
  Event<ComponentState, unknown>
>;

type Component<
  ComponentState extends State,
  ComponentEvents extends Events<ComponentState>,
> = {
  initialState: ComponentState;
  events: ComponentEvents;
};

// Helper type to extract the payload type from an Event
type ExtractPayload<E> = E extends Event<unknown, infer P> ? P : never;
// The dispatcher type
type Dispatchers<ComponentEvents extends Events<unknown>> = {
  [E in keyof ComponentEvents]: (
    payload: ExtractPayload<ComponentEvents[E]>,
  ) => void;
};
// Utility to get typed [key, value] entries from an object
function typedEntries<K extends string, T extends Record<K, unknown>>(
  obj: T,
): [string, T[K]][] {
  return Object.entries(obj) as [K, T[K]][];
}

function buildDispatcher<S extends State, P extends Payload>(
  event: Event<S, P>,
  stateContainer: { state: S },
): (payload: P) => void {
  return (payload: P) => {
    stateContainer.state = event.reducer(
      stateContainer.state,
      event.sanitizePayload(payload),
    );
  };
}
function buildDispatchers<S extends State, E extends Events<S>>(
  component: Component<S, E>,
  stateContainer: { state: S },
): Dispatchers<E> {
  const result: Partial<Dispatchers<E>> = {};
  for (const [eventName, event] of Object.entries(component.events)) {
    (result as any)[eventName] = buildDispatcher(event, stateContainer);
  }
  return result as Dispatchers<E>;
}

// Example Usage

const myState = { count: 0 };
type MyState = typeof myState;
type ClickedPayload = { x: number; y: number };
type SubmittedPayload = { value: string };
const clickedPayloadSchema = z.object({ x: z.number(), y: z.number() });
const submittedPayloadSchema = z.object({ value: z.string() });
const clicked: Event<MyState, ClickedPayload> = {
  sanitizePayload: (payload: ClickedPayload) =>
    clickedPayloadSchema.parse(payload),
  reducer: (state, payload) => ({
    count: state.count + payload.x + payload.y,
  }),
};
const submitted: Event<MyState, SubmittedPayload> = {
  sanitizePayload: submittedPayloadSchema.parse,
  reducer: (state, payload) => ({
    count: state.count + parseInt(payload.value, 10),
  }),
};

const myEvents: Events<MyState> = {
  clicked,
  submitted,
};

const myComponent = {
  initialState: myState,
  events: myEvents,
};

const stateContainer = { state: myComponent.initialState };
const myDispatchers = buildDispatchers(myComponent, stateContainer);

// These are now strongly typed:
myDispatchers.clicked({ x: "1", y: 2 }); // OK
myDispatchers.submitted({ value: "100" }); // OK

// Uncommenting the following lines will cause type errors:
// myDispatchers.clicked({ value: "oops" });
// myDispatchers.submitted({ x: 1, y: 2 });
