import { v4 as createUuid } from 'uuid';
import Cookies from 'js-cookie';

class DeviceUuidService {
    static COOKIE_NAME = 'device_uuid';

    static initializeCookie() {
        let uuid = Cookies.get(DeviceUuidService.COOKIE_NAME);
        if (!uuid) {
            uuid = createUuid();
            Cookies.set(DeviceUuidService.COOKIE_NAME, uuid, { expires: 365*100 });
        }
        return uuid;
    }
}

export default DeviceUuidService;