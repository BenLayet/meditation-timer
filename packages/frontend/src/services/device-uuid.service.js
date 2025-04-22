import { v4 as createUuid } from 'uuid';
import Cookies from 'js-cookie';

export class DeviceUuidService {
    static COOKIE_NAME = 'device_uuid';

    constructor(cookieLibrary = Cookies, uuidGenerator = createUuid) {
        this.cookieLibrary = cookieLibrary;
        this.uuidGenerator = uuidGenerator;
    }

    getDeviceUuid() {
        let uuid = this.cookieLibrary.get(DeviceUuidService.COOKIE_NAME);
        if (!uuid) {
            uuid = this.uuidGenerator();
            this.cookieLibrary.set(DeviceUuidService.COOKIE_NAME, uuid, { expires: 365 * 100 });
        }
        return uuid;
    }
}
