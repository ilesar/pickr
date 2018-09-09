import {BaseScene} from "./BaseScene";
import {SceneSelectors, Selectors} from "../enum/Selectors";
import {RestartButton} from "../models/RestartButton";

export class EndScene extends BaseScene {

    private _button: RestartButton;
    private _scoreText: any;

    public constructor() {
        super();
        this._wrapper = document.querySelector(SceneSelectors.EndScene);
        this._scoreText = document.querySelector(Selectors.Score);
        this._button = new RestartButton();
    }

    public setScore(score: number) {
        this._scoreText.innerHTML = this.formatOutput(score);
    }

    private formatOutput(output: number) {
        return output.toFixed(2);
    }

}