import {SceneSelectors} from "../enum/Selectors";
import {StartButton} from "../models/StartButton";
import {Title} from "../models/Title";
import {BaseScene} from "./BaseScene";

export class IntroScene extends BaseScene {

    private _button: StartButton;
    private _title: Title;

    public constructor() {
        super();
        this._wrapper = document.querySelector(SceneSelectors.IntroScene);
        this._title = new Title();
        this._button = new StartButton();
    }

    public get title() {
        return this._title;
    }

    public get startButton() {
        return this._button;
    }

}
