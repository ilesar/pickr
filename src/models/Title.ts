import {Modifiers} from "../enum/Modifiers";

export class Title {

    private _title: any;

    public constructor() {
        this._title = document.querySelector(".title");
    }

    public hide() {
        this._title.classList.add(Modifiers.Hidden);
    }

    public show() {
        this._title.classList.remove(Modifiers.Hidden);
    }
}