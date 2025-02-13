export const appOpenedHandler = async (dispatch) =>
    dispatch('LANGUAGE_DETECTION_REQUESTED');
export const meditationSessionStartedHandler = async (dispatch, payload) =>
    dispatch('PREPARATION_STARTED', {currentTimestampInSeconds: payload.currentTimestampInSeconds});

export const languageDetectionRequestedHandler = (detectLanguage) => async (dispatch) => {
    const detectedLanguage = await detectLanguage();
    dispatch( 'LANGUAGE_DETECTED', {detectedLanguage});
}