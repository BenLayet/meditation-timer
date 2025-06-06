import { validateNewEvent } from "domain/src/models/event.model.js";
import { validateUserUuid } from "domain/src/models/user.model.js";
import { toPage } from "./pagination.js";
import { errorCodes } from "domain/src/errors/error-codes.js";
import { FunctionalError } from "../errors/functional-error.js";

export class EventRepository {
  constructor(datasource, datasourceErrorCodes, logger) {
    this.datasource = datasource;
    this.datasourceErrorCode = datasourceErrorCodes;
    this.logger = logger;
  }

  async saveEvent(event) {
    validateNewEvent(event);
    try {
      const row = await this.datasource`
      INSERT INTO events (user_uuid, uuid, type, payload)
            VALUES (${event.userUuid}, ${event.uuid}, ${event.type}, ${event.payload})
      ON CONFLICT (uuid)
        DO UPDATE SET type    = EXCLUDED.type,
                      payload = EXCLUDED.payload
      RETURNING *;
    `;
      return toEvent(row[0]);
    } catch (error) {
      this.logger.error(error, `error while inserting event`);
      if (error.code === this.datasourceErrorCode.FOREIGN_KEY_VIOLATION) {
        throw new FunctionalError(
          `user ${event.userUuid} does not exist`,
          errorCodes.USER_DOES_NOT_EXIST,
        );
      } else {
        throw error;
      }
    }
  }

  async getEventPage(userUuid, pageRequest) {
    validateUserUuid(userUuid);
    const rows = await this.datasource`
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
