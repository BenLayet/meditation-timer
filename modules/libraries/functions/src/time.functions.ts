import { flow } from "lodash-es";

export const currentEpochMilliseconds = Date.now;
export const currentEpochSeconds = flow(
  currentEpochMilliseconds,
  (ms: number) => ms / 1000,
  Math.floor,
);
export const currentEpochDay = flow(
  currentEpochSeconds,
  (epochSeconds: number) => epochSeconds / (24 * 60 * 60),
  Math.floor,
);

export const formatLocalizedDateTime =
  (locale: string, options: Intl.DateTimeFormatOptions = {}) =>
  (epochSeconds: number): string => {
    if (!epochSeconds) return "";

    const fmt = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      ...options,
    });
    return fmt.format(new Date(epochSeconds * 1000));
  };
