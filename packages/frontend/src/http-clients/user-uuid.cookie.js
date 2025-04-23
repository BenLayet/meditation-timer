import { v4 as createUuid } from 'uuid';
import Cookies from 'js-cookie';

export class UserUuidCookie {
    static COOKIE_NAME = 'user_uuid';

    constructor(cookieLibrary = Cookies, uuidGenerator = createUuid) {
        this.cookieLibrary = cookieLibrary;
        this.uuidGenerator = uuidGenerator;
    }

    ensureCookieIsSet() {
        let uuid = this.cookieLibrary.get(UserUuidService.COOKIE_NAME);
        if (!uuid) {
            uuid = this.uuidGenerator();
            this.cookieLibrary.set(UserUuidService.COOKIE_NAME, uuid, { expires: 365 * 100 });
        }
    }
}
