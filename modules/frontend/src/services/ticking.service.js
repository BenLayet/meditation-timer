import { currentEpochSeconds } from "../lib/time.functions.js";

export class TickingService {
  intervalIds = {};
  startTicking = (timerName, callback) => {
    if (this.intervalIds[timerName]) {
      throw new Error(`timer ${timerName} already running`);
    }
    this.intervalIds[timerName] = setInterval(
      () => callback(currentEpochSeconds()),
      1000,
    );
  };
  stopTicking = (timerName) => {
    clearInterval(this.intervalIds[timerName]);
    delete this.intervalIds[timerName];
  };
}
