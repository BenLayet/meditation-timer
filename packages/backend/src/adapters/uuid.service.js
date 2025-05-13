import { v4 } from "uuid";

export class UuidService{
    createUuid(){
        return v4();
    }
}