import {Selectors} from "../enum/Selectors";
import {MethodNotImplementedError} from "../errors/MethodNotImplementedError";
import {HideableInterface} from "../interfaces/HideableInterface";

export class Task implements HideableInterface {

    private _wrapper: any;
    private _colorName: any;

    public constructor() {
        this._wrapper = document.querySelector(Selectors.Task);
        this._colorName = document.querySelector(Selectors.ColorName);
    }

    set colorName(value: any) {
        this._colorName.innerHTML = value;
    }

    public hide(): Promise<void> {
        throw new MethodNotImplementedError();
    }

    public show(): Promise<void> {
        throw new MethodNotImplementedError();
    }
}
