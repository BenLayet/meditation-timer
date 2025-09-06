import { createEffect } from "@softersoftware/state-manager/create-effect";
import { meditationTimerAppEvents } from "@meditation-timer/domain/src/features/meditation-timer-app/meditation-timer-app.events.js";

export const onlineDetectionEffects = ({}, rootVM) => {
  const dispatchers = rootVM.dispatchers;
  const onlineEventListener = () =>
    dispatchers.onlineStatusChanged({ isOnline: !!navigator.onLine });

  const dispatchEventWhenOnline = async () => {
    // Add event listeners for online and offline events
    window.removeEventListener("online", onlineEventListener);
    window.addEventListener("online", onlineEventListener);
    //  dispatch the event immediately
    onlineEventListener();
  };

  return [
    createEffect({
      afterEvent: meditationTimerAppEvents.onlineStatusWatchRequested,
      then: dispatchEventWhenOnline,
    }),
  ];
};
