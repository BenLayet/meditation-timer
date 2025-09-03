import { parsePageRequest } from "./page-request.parser.js";
import { extractBearerToken } from "./bearer-token.js";
import { FunctionalError } from "../errors/functional-error.js";
import { errorCodes } from "domain/src/errors/error-codes.js";

export const postEventHandler =
  ({ logger, postEvent }) =>
  async (req, res) => {
    const event = req.body;
    let token;
    try {
      token = extractBearerToken(req); // Extract token from Authorization header
    } catch (error) {
      logger.error(error, `token is missing`);
      return res.status(401).json({ error: "security token is required" });
    }
    try {
      const created = await postEvent(token, event);
      res.status(201).json(created);
    } catch (error) {
      let status = 500;
      if (error instanceof FunctionalError) {
        switch (error.code) {
          case errorCodes.USER_DOES_NOT_EXIST:
            status = 403;
            break;
          default:
            logger.error(error, `unexpected functional error`);
        }
      }
      res.status(status).json({ error: error.message });
      logger.error(error, event);
    }
  };

export const getEventPageHandler =
  ({ logger, getEventPage }) =>
  async (req, res) => {
    const pageRequest = parsePageRequest(req);
    let token;
    try {
      token = extractBearerToken(req); // Extract token from Authorization header
    } catch (error) {
      logger.error(error, `token is missing`);
      return res.status(401).json({ error: "security token is required" });
    }
    try {
      const page = await getEventPage(token, pageRequest);
      res.status(200).json(page);
    } catch (error) {
      res.status(500).json({ error: error.message });
      logger.error(error);
    }
  };
