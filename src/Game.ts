import {IntroScene} from "./scenes/IntroScene";
import {GameScene} from "./scenes/GameScene";
import {EndScene} from "./scenes/EndScene";
import {GameEvents} from "./enum/GameEvents";

export class Game {
    private readonly MAX_ROUND = 3;
    private _round: number = 0;
    private _score: number = 0;
    private _introScene: IntroScene;
    private _gameScene: GameScene;
    private _endScene: EndScene;

    public constructor() {
        this.loadScenes();
        this.initEvents();
    }

    private loadScenes() {
        this._introScene = new IntroScene();
        this._gameScene = new GameScene();
        this._endScene = new EndScene();
    }

    public init() {
        this._introScene.show();
    }

    private start() {
        this._endScene.hide();
        this._score = 0.0;
        this._round = 0;
        this.incrementRound();
        this._introScene.hide();
        this._gameScene.activate();
    }

    private nextRound() {
        this._gameScene.deactivate();

        setTimeout(() => {
            if (!this.incrementRound()) {
                this.end();
                return;
            }

            this._gameScene.activate();
        }, 700);
    }

    private initEvents() {
        document.addEventListener(GameEvents.Start, () => {
            this.start();
        });

        document.addEventListener(GameEvents.NextRound, (event: any) => {
            this._score += event.detail;
            console.log(event.detail);
            console.log(this._score);
            this.nextRound();
        })
    }

    public end() {
        this._gameScene.deactivate();
        console.log(`Setting score to ${this._score}`);
        this._endScene.setScore(this._score);
        this._endScene.show();
    }

    private incrementRound(): boolean {
        this._round++;

        if (this._round > this.MAX_ROUND) {
            return false;
        }

        console.log(`Starting round ${this._round} of ${this.MAX_ROUND}`);

        return true;
    }
}