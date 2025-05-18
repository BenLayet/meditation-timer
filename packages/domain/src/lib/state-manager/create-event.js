import ow from "ow";

function sanitizePayload(payload, payloadShape) {
    // Remove keys in payload that do not exist in payloadShape
    return Object.fromEntries(
        Object.entries(payloadShape).map(([key]) => [key, payload[key]])
    );
}

export const createEvent = ({payloadShape, eventType}, componentPath, payload, isNewCycle=false) => {

    payload = sanitizePayload(payload ?? {}, payloadShape ?? {});
    ow(payload, `::while creating event ${componentPath.join('.')}:${eventType} with payload ${JSON.stringify(payload)}`, ow.object.exactShape(payloadShape ?? {}));
    return {componentPath, eventType, payload, isNewCycle};
}


