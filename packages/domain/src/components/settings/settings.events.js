import ow from "ow";
import {createEventFactory} from "../../lib/event-factory.js";

const gongVolumeSetPayloadFactory = (gongVolumeString) => {
    ow(gongVolumeString, ow.string.matches(/^\d+$/));
    const gongVolume = parseInt(gongVolumeString);
    ow(gongVolume, ow.number.integer.inRange(0, 100));
    return {gongVolume};
};

export const gongVolumeSet = createEventFactory('GONG_VOLUME_SET', gongVolumeSetPayloadFactory);

