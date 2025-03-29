import {validateNewEvent} from "../validators/event.validator.js";
import {validateUserUuid} from "../validators/user.validator.js";
import {toPage, validatePageRequest} from "./pagination.js";

export class EventRepository {
  constructor(datasource) {
    this.datasource = datasource;
  }

  async saveEvent(event) {
    validateNewEvent(event);
    return this.datasource`
      INSERT INTO events (type, device_uuid, payload)
            VALUES (${event.type}, ${event.deviceUuid}, ${event.payload})
            RETURNING *;
        `.then(toEvent);
  }

  async getEventPage(userUuid, pageRequest) {
    validateUserUuid(userUuid);
    validatePageRequest(pageRequest);
    return this.datasource`
            SELECT events.*
            FROM events
            INNER JOIN devices 
            ON devices.uuid = events.device_uuid
            WHERE id > ${pageRequest.afterId}
              AND devices.user_uuid = ${userUuid}
            ORDER BY id
            LIMIT ${pageRequest.size};
        `.then(toPage(pageRequest.size, toEvents));
  }
}
const toEvent = (row) => ({
  id: row.id,
  eventType: row.event_type,
  payload: row.payload,
  deviceUuid: row.device_uuid,
});
const toEvents = (rows) => rows.map(toEvent);
