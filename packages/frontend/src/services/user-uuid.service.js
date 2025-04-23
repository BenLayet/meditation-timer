import { v4 as createUuid } from 'uuid';
import Cookies from 'js-cookie';

export class UserUuidService {
    static COOKIE_NAME = 'user_uuid';

    constructor(cookieLibrary = Cookies, uuidGenerator = createUuid) {
        this.cookieLibrary = cookieLibrary;
        this.uuidGenerator = uuidGenerator;
    }

    getUuid() {
        let uuid = this.cookieLibrary.get(UserUuidService.COOKIE_NAME);
        if (!uuid) {
            uuid = this.uuidGenerator();
            this.cookieLibrary.set(UserUuidService.COOKIE_NAME, uuid, { expires: 365 * 100 });
        }
        return uuid;
    }
}
