import { v4 } from "uuid";

export class UuidGenerator{
    createUuid(){
        return v4();
    }
}