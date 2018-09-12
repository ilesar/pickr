import {Modifiers} from "../enum/Modifiers";
import {Selectors} from "../enum/Selectors";

export class Score {

    private _wrapper: any;
    private _score: any;

    public constructor() {
        this._wrapper = document.querySelector(Selectors.ScoreWrapper);
        this._score = document.querySelector(Selectors.Score);
    }

    public set score(score: number) {
        this._score.innerHTML = this.formatOutput(score);
    }

    private formatOutput(output: number) {
        return output.toFixed(2);
    }

}
