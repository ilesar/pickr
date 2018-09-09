import {Selectors} from "../enum/Selectors";

export class Score {

    private _wrapper: any;
    private _score: any;

    public constructor() {
        this._wrapper = document.querySelector(Selectors.ScoreWrapper);
        this._score = document.querySelector(Selectors.Score);
    }

}