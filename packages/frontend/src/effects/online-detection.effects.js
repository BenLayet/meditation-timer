import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { meditationTimerAppEvents } from "domain/src/components/meditation-timer-app/meditation-timer-app.events.js";

export const onlineDetectionEffects = ({}, rootVM) => {
  const dispatchers = rootVM.dispatchers;

  const dispatchEventWhenOnline = async () => {
    // Add event listeners for online and offline events
    window.removeEventListener("online", dispatchers.onlineStatusChanged);
    window.addEventListener("online", dispatchers.onlineStatusChanged);
    //  dispatch the event immediately
    dispatchers.onlineStatusChanged({ isOnline: !!navigator.onLine });
  };

  return [
    createEffect({
      afterEvent: meditationTimerAppEvents.appOpened,
      then: dispatchEventWhenOnline,
    }),
  ];
};
