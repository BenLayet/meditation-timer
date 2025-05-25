import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { meditationTimerAppEvents } from "domain/src/components/meditation-timer-app/meditation-timer-app.events.js";

export const createOnlineDetectionEffects = ({}, rootVM) => {
  const dispatchers = rootVM.dispatchers;

  const dispatchEventWhenOnline = async () => {
    // Add event listeners for online and offline events
    window.removeEventListener("online", dispatchers.onlineDetected);
    window.addEventListener("online", dispatchers.onlineDetected);
    if (navigator.onLine) {
      // If already online, dispatch the event immediately
      dispatchers.onlineDetected();
    }
  };

  return [
    createEffect({
      afterEvent: meditationTimerAppEvents.appOpened,
      then: dispatchEventWhenOnline,
    }),
  ];
};
