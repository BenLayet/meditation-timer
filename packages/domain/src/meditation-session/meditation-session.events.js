import ow from 'ow';

export const MEDITATION_DURATION_SET = 'MEDITATION_DURATION_SET';
export const MEDITATION_SESSION_STARTED = 'MEDITATION_SESSION_STARTED';
export const MEDITATION_SESSION_STOPPED = 'MEDITATION_SESSION_STOPPED';
export const GONG_VOLUME_SET = 'GONG_VOLUME_SET';

export const meditationDurationSet = (durationInMinutesString) => {
    ow(durationInMinutesString, ow.string.matches(/^\d+$/));
    const durationInMinutes = parseInt(durationInMinutesString);
    ow(durationInMinutes, ow.number.integer.positive);

    return {
        type: MEDITATION_DURATION_SET,
        payload: {durationInMinutes},
    };
};

export const meditationSessionStarted = (currentTimestampInSeconds) => {
    ow(currentTimestampInSeconds, ow.number.integer.positive);
    return {
        type: MEDITATION_SESSION_STARTED,
        payload: {currentTimestampInSeconds},
    };
};

export const meditationSessionStopped = () => {
    return {
        type: MEDITATION_SESSION_STOPPED,
        payload: {},
    };
};

export const gongVolumeSet = (gongVolumeString) => {
    ow(gongVolumeString, ow.string.matches(/^\d+$/));
    const gongVolume = parseInt(gongVolumeString);
    ow(gongVolume, ow.number.integer.inRange(0, 100));
    return {
        type: GONG_VOLUME_SET,
        payload: {gongVolume},
    };
};
