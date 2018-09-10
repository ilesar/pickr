import {SceneSelectors} from "../enum/Selectors";
import {RestartButton} from "../models/RestartButton";
import {Score} from "../models/Score";
import {BaseScene} from "./BaseScene";

export class EndScene extends BaseScene {

    protected _wrapper: any;
    private _button: RestartButton;
    private _scoreText: Score;

    public constructor() {
        super();
        this._wrapper = document.querySelector(SceneSelectors.EndScene);
        this._scoreText = new Score();
        this._button = new RestartButton();
    }

    public setScore(score: number) {
        this._scoreText.score = score;
    }

}
