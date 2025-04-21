import {gongService} from "../services/gong.service.js";
import {meditationTimerAppEvents} from "domain/src/components/meditation-timer-app/meditation-timer-app.events.js";
import {wakeLockService} from "../services/wakeLock.service.js";
import {meditationSessionEvents} from "domain/src/components/meditation-session/meditation-session.events.js";
import {meditationSettingsEvents} from "domain/src/components/meditation-settings/meditation-settings.events.js";
import {startTimer, stopTimer} from "./timer.effect.js";
import {preparationEvents} from "domain/src/components/preparation/preparation.events.js";
import {saveMeditationEffect} from "./saveMeditation.effect.js";
import {actualMeditationEvents} from "domain/src/components/actual-meditation/actual-meditation.events.js";
import {statisticsEvents} from "domain/src/components/statistics/statistics.events.js";
import {Effects} from "domain/src/lib/state-manager/create-effect.js";
import { loadMeditations } from "./loadMeditations.effect.js";

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
    effects.add({
        afterEvent: meditationSettingsEvents.gongOffToggled,
        then: gongService.volumeOff,
    });
    effects.add({
        afterEvent: meditationSettingsEvents.gongOnToggled,
        then: gongService.volumeOn,
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
        then: startTimer(preparationVmEvents, "preparation"),
    });
    effects.add({
        afterEvent: preparationEvents.timerStopRequested,
        onComponent: ["meditationSession", "preparation"],
        then: stopTimer("preparation"),
    });

    // Actual Meditation Events
    const actualMeditationVmEvents = rootVM.children.meditationSession.children.actualMeditation.events;
    effects.add({
        afterEvent: actualMeditationEvents.timerStartRequested,
        onComponent: ["meditationSession", "actualMeditation"],
        then: startTimer(actualMeditationVmEvents, "actualMeditation"),
    });
    effects.add({
        afterEvent: actualMeditationEvents.timerStopRequested,
        onComponent: ["meditationSession", "actualMeditation"],
        then: stopTimer("actualMeditation"),
    });
    effects.add({
        afterEvent: actualMeditationEvents.saveRequested,
        onComponent: ["meditationSession", "actualMeditation"],
        then: saveMeditationEffect(actualMeditationVmEvents),
    });

    // Fetch Statistics
    const statisticsVmEvents = rootVM.children.statistics.events;
    effects.add({
        afterEvent: statisticsEvents.meditationHistoryRequested,
        onComponent: ["statistics"],
        then: loadMeditations(statisticsVmEvents),
    });

    //add effects as change listeners
    effects.get().forEach(stateManager.addEffect);
};
