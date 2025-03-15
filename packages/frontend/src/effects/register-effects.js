import {gongService} from "../services/gongService.js";
import {meditationTimerAppEvents} from "domain/src/components/meditation-timer-app/meditation-timer-app.events.js";
import {wakeLockService} from "../services/wakeLockService.js";
import {meditationSessionEvents} from "domain/src/components/meditation-session/meditation-session.events.js";
import {timerStartEffect, timerStopEffect} from "./timer.effect.js";
import {preparationEvents} from "domain/src/components/preparation/preparation.events.js";
import {saveMeditationEffect} from "./save-meditation.effect.js";
import {actualMeditationEvents} from "domain/src/components/actual-meditation/actual-meditation.events.js";
import {statisticsEffect} from "./statistics.effect.js";
import {statisticsEvents} from "domain/src/components/statistics/statistics.events.js";
import {Effects} from "domain/src/lib/state-manager/create-effect.js";

export const registerEffects = (stateManager) => {

    const rootVM = stateManager.getRootVM();
    const effects = new Effects();
    //gong
    effects.add({
        afterEvent: meditationTimerAppEvents.gongPlayRequested,
        then: gongService.play,
    });
    effects.add({
        afterEvent: meditationTimerAppEvents.gongStopRequested,
        then: gongService.stop,
    });

    //sleep mode
    effects.add({
        afterEvent: meditationSessionEvents.disableSleepModeRequested,
        then: wakeLockService.requestWakeLock,
    });

    effects.add({
        afterEvent: meditationSessionEvents.enableSleepModeRequested,
        then: wakeLockService.releaseWakeLock,
    });

    // Preparation Timer Events
    const preparationVmEvents = rootVM.children.meditationSession.children.preparation.events;
    effects.add({
        afterEvent: preparationEvents.timerStartRequested,
        onComponent: ["meditationSession", "preparation"],
        then: timerStartEffect(preparationVmEvents, "preparation"),
    });
    effects.add({
        afterEvent: preparationEvents.timerStopRequested,
        onComponent: ["meditationSession", "preparation"],
        then: timerStopEffect("preparation"),
    });

    // Actual Meditation Events
    const actualMeditationVmEvents = rootVM.children.meditationSession.children.actualMeditation.events;
    effects.add({
        afterEvent: actualMeditationEvents.timerStartRequested,
        onComponent: ["meditationSession", "actualMeditation"],
        then: timerStartEffect(actualMeditationVmEvents, "actualMeditation"),
    });
    effects.add({
        afterEvent: actualMeditationEvents.timerStopRequested,
        onComponent: ["meditationSession", "actualMeditation"],
        then: timerStopEffect("actualMeditation"),
    });
    effects.add({
        afterEvent: actualMeditationEvents.saveRequested,
        onComponent: ["meditationSession", "actualMeditation"],
        then: saveMeditationEffect(actualMeditationVmEvents),
    });

    // Fetch Statistics
    const statisticsVmEvents = rootVM.children.statistics.events;
    effects.add({
        afterEvent: statisticsEvents.fetchRequested,
        onComponent: ["statistics"],
        then: statisticsEffect(statisticsVmEvents),
    });

    //add effects as change listeners
    effects.get().forEach(stateManager.addStateChangedListener)
};
