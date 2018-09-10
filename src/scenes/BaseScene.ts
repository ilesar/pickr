import {MethodNotImplementedError} from "../errors/MethodNotImplementedError";
import {HideableInterface} from "../interfaces/HideableInterface";

export class BaseScene implements HideableInterface {
    protected _wrapper: any;
    public async show(): Promise<void> {
        throw new MethodNotImplementedError();
    }

    public async hide(): Promise<void> {
        throw new MethodNotImplementedError();
    }
}
