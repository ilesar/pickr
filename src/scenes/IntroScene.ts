import {BaseScene} from "./BaseScene";
import {GameEvents} from "../enum/GameEvents";
import {StartButton} from "../models/StartButton";
import {SceneSelectors, Selectors} from "../enum/Selectors";
import {Title} from "../models/Title";


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

    public async hide() {
        await this._title.hide();
        await super.hide();
    }

}