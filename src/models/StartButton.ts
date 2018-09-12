import {GameEvents} from "../enum/GameEvents";
import {MouseEvents} from "../enum/MouseEvents";
import {Selectors} from "../enum/Selectors";
import {MethodNotImplementedError} from "../errors/MethodNotImplementedError";
import {HideableInterface} from "../interfaces/HideableInterface";

export class StartButton implements HideableInterface {

    private _wrapper: any;

    public constructor() {
        this._wrapper = document.querySelector(Selectors.StartButton);

        this.initEvents();
    }

    public async show(): Promise<void> {
        throw new MethodNotImplementedError();
    }

    public async hide(): Promise<void> {
        throw new MethodNotImplementedError();
    }

    private initEvents() {
        this._wrapper.removeEventListener(MouseEvents.Click, (event: any) => {/**/});
        this._wrapper.addEventListener(MouseEvents.Click, () => {
            document.dispatchEvent(new CustomEvent(GameEvents.Start));
        });
    }

}
