import ow from 'ow';

class MeditationLocalStorageService {
    // ...existing code...

    validateMeditations(meditations) {
        ow(meditations, ow.array.ofType(ow.object.exactShape({
            startedTimeInSeconds: ow.number.positive,
            durationInMinutes: ow.number.greaterThanOrEqual(0),
        })));
    }
}
