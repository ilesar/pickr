import {GameEvents} from "../enum/GameEvents";
import {MouseEvents} from "../enum/MouseEvents";
import {Selectors} from "../enum/Selectors";

export class RestartButton {

    private _button: any;

    constructor() {
        this._button = document.querySelector(Selectors.RestartButton);

        this.initEvents();
    }

    private initEvents() {
        this._button.removeEventListener(MouseEvents.Click, (event: any) => {});
        this._button.addEventListener(MouseEvents.Click, () => {
            console.log("Restart clicked");
            document.dispatchEvent(new CustomEvent(GameEvents.Start));
        });
    }

}