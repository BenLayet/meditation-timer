import {validateNewEvent} from "../validators/event.validator.js";
import {validateUserUuid} from "../validators/user.validator.js";
import {toPage} from "./pagination.js";

export class EventRepository {
  constructor(datasource) {
    this.datasource = datasource;
  }

  async saveEvent(userUuid, event) {
    validateUserUuid(userUuid);
    validateNewEvent(event);

    const row = await this.datasource`
      INSERT INTO events (user_uuid, uuid, type, payload)
            VALUES (${userUuid}, ${event.uuid}, ${event.type}, ${event.payload})
      ON CONFLICT (uuid)
        DO UPDATE SET type    = EXCLUDED.type,
                      payload = EXCLUDED.payload
      RETURNING *;

    `;
    console.log("Event saved", row);
    return toEvent(row[0]);
  }

  async getEventPage(userUuid, pageRequest) {
    validateUserUuid(userUuid);
    const rows = await  this.datasource`
            SELECT *
            FROM events
            WHERE id > ${pageRequest.afterId}
              AND user_uuid = ${userUuid}
            ORDER BY id
            LIMIT ${pageRequest.size};
    `;
     return toPage(pageRequest, toEvents)(rows);
  }
}
const toEvent = (row) => ({
  id: row.id,
  uuid: row.uuid,
  type: row.type,
  payload: row.payload,
});
const toEvents = (rows) => rows.map(toEvent);
