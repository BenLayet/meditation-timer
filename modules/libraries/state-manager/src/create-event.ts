import ow from "ow";

function sanitizePayload(
  payload: Record<string, any>,
  payloadShape: Record<string, any>,
): Record<string, any> {
  // Remove keys in payload that do not exist in payloadShape
  return Object.fromEntries(
    Object.entries(payloadShape).map(([key]) => [key, payload[key]]),
  );
}
export const createEvent = (
  {
    payloadShape,
    eventType,
    isNewCycle,
  }: {
    payloadShape?: Record<string, any>;
    eventType: string;
    isNewCycle?: boolean;
  },
  componentPath: string[],
  payload: Record<string, any>,
): {
  componentPath: string[];
  eventType: string;
  payload: Record<string, any>;
  isNewCycle: boolean;
} => {
  payload = sanitizePayload(payload ?? {}, payloadShape ?? {});
  isNewCycle = !!isNewCycle;
  ow(
    payload,
    `::while creating event ${componentPath.join(".")}:${eventType} with payload ${JSON.stringify(payload)}`,
    ow.object.exactShape(payloadShape ?? {}),
  );
  return { componentPath, eventType, payload, isNewCycle };
};
