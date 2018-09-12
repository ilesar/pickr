import {Selectors} from "../enum/Selectors";
import {MethodNotImplementedError} from "../errors/MethodNotImplementedError";
import {HideableInterface} from "../interfaces/HideableInterface";

export class Round implements HideableInterface {

    private _wrapper: any;
    private _value: number;
    private _score: number;
    private _scores: number[];
    private _max: number;

    public constructor(max: number) {
        this._max = max;
        this._scores = [];
        this._wrapper = document.querySelector(Selectors.Round);
        this.reset();
    }

    public reset() {
        this._value = 0;
        this._score = 0;
    }

    public increment() {
        this._value++;
        this._wrapper.innerHTML = `Round ${this._value} of ${this._max}`;
    }

    public addScore(score: number) {
        this._score += score;
        this._scores.push(score);
    }

    public get score() {
        return this._score;
    }

    public get scores() {
        return this._scores;
    }

    public get value() {
        return this._value;
    }

    public hide(): Promise<void> {
        throw new MethodNotImplementedError();
    }

    public show(): Promise<void> {
        throw new MethodNotImplementedError();
    }
}
