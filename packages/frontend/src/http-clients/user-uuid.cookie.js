import {v4 as createUuid} from 'uuid';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'userUuid';
export class UserUuidCookie {

    constructor(cookieLibrary = Cookies, uuidGenerator = createUuid) {
        this.cookieLibrary = cookieLibrary;
        this.uuidGenerator = uuidGenerator;
    }

    ensureCookieIsSet() {
        let uuid = this.cookieLibrary.get(COOKIE_NAME);
        if (!uuid) {
            uuid = this.uuidGenerator();
            this.cookieLibrary.set(COOKIE_NAME, uuid, {expires: 365 * 100});
        }
    }
}
