import { flow } from "lodash-es";

export const currentEpochMilliseconds = Date.now;
export const currentEpochSeconds = flow(
  currentEpochMilliseconds,
  (ms) => ms / 1000,
  Math.floor,
);
export const currentEpochDay = flow(
  currentEpochSeconds,
  (epochSeconds) => epochSeconds / (24 * 60 * 60),
  Math.floor,
);

export const formatLocalizedDateTime =
  (locale, options = {}) =>
  (epochSeconds) => {
    if (!epochSeconds) return "";

    const fmt = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      ...options,
    });
    return fmt.format(new Date(epochSeconds * 1000));
  };
