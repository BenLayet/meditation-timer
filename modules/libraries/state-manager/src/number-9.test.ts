import { z, ZodType } from "zod";

// The State type can be anything (for simplicity)
type State = Record<string, any>;

// This generic infers the correct reducer signature for each event
type Event<S extends State, Schema extends ZodType> = {
  payloadSchema: Schema;
  reducer: (state: S, payload: z.infer<Schema>) => S;
};
type Events<ComponentState extends State> = Record<
  string,
  Event<ComponentState, ZodType>
>;

type Component<
  ComponentState extends State,
  ComponentEvents extends Events<ComponentState>,
> = {
  initialState: ComponentState;
  events: ComponentEvents;
};

// The dispatcher type
type Dispatchers<C extends Component<any, any>> = {
  [K in keyof C["events"]]: (
    payload: z.infer<C["events"][K]["payloadSchema"]>,
  ) => void;
};
// Utility to get typed [key, value] entries from an object
function typedEntries<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

// Implementation of createDispatchers
function createDispatchers<C extends Component<any, any>>(
  component: C,
): Dispatchers<C> {
  const dispatchers = {} as Dispatchers<C>;
  for (const [eventName, event] of typedEntries(component.events)) {
    dispatchers[eventName] = (rawPayload: any) => {
      const payload = event.payloadSchema.parse(rawPayload);
      stateContainer.state = event.reducer(stateContainer.state, payload);
    };
  }
  return dispatchers;
}

// Example Usage

const myState = { count: 0 };
type MyState = typeof myState;

const clickedPayloadSchema = z.object({ x: z.number(), y: z.number() });
const submittedPayloadSchema = z.object({ value: z.string() });
const clicked: Event<MyState, typeof clickedPayloadSchema> = {
  payloadSchema: clickedPayloadSchema,
  reducer: (state, payload) => ({
    count: state.count + payload.x + payload.y,
  }),
};
const submitted: Event<MyState, typeof submittedPayloadSchema> = {
  payloadSchema: submittedPayloadSchema,
  reducer: (state, payload) => ({
    count: state.count + parseInt(payload.value, 10),
  }),
};

const myEvents: Events<> = {
  clicked,
  submitted,
};

const myComponent = {
  initialState: myState,
  events: myEvents,
};

const stateContainer = { state: myComponent.initialState };
const myDispatchers = createDispatchers(myComponent, stateContainer);

// These are now strongly typed:
myDispatchers.clicked({ x: 1, y: 2 }); // OK
myDispatchers.submitted({ value: "100" }); // OK

// Uncommenting the following lines will cause type errors:
// myDispatchers.clicked({ value: "oops" });
// myDispatchers.submitted({ x: 1, y: 2 });
