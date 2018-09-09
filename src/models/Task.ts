import {Selectors} from "../enum/Selectors";
import {Modifiers} from "../enum/Modifiers";

export class Task {

    private _wrapper: any;
    private _colorName: any;

    public constructor() {
        this._wrapper = document.querySelector(Selectors.Task);
        this._colorName = document.querySelector(Selectors.ColorName);
    }


    set colorName(value: any) {
        this._colorName.innerHTML = value;
    }

    public show() {
        this._colorName.classList.remove(Modifiers.Hidden)
    }

    public hide() {
        this._colorName.classList.add(Modifiers.Hidden);
    }
}