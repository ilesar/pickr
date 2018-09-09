import {GameEvents} from "../enum/GameEvents";
import {MouseEvents} from "../enum/MouseEvents";
import {Selectors} from "../enum/Selectors";
import {Modifiers} from "../enum/Modifiers";

export class StartButton {

    private _button: any;

    constructor() {
        this._button = document.querySelector(Selectors.StartButton);

        this.initEvents();
    }

    private initEvents() {
        this._button.addEventListener(MouseEvents.Click, () => {
            document.dispatchEvent(new CustomEvent(GameEvents.Start));
        });
    }

    public hide() {
        this._button.classList.add(Modifiers.Hidden);
    }

    public show() {
        this._button.classList.remove(Modifiers.Hidden);
    }

}