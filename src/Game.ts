import {GameEvents} from "./enum/GameEvents";
import {DelayHelper} from "./helpers/DelayHelper";
import {EndScene} from "./scenes/EndScene";
import {GameScene} from "./scenes/GameScene";
import {IntroScene} from "./scenes/IntroScene";

export class Game {
    private readonly MAX_ROUND = 5;
    private _round: number = 0;
    private _score: number = 0;
    private _introScene: IntroScene;
    private _gameScene: GameScene;
    private _endScene: EndScene;

    public constructor() {
        this.loadScenes();
        this.initEvents();
    }

    public async init() {
        await DelayHelper.sleep(400);
        await this._introScene.show();
    }

    private loadScenes() {
        this._introScene = new IntroScene();
        this._gameScene = new GameScene();
        this._endScene = new EndScene();
    }

    private async start() {
        await this._endScene.hide();
        this._score = 0.0;
        this._round = 0;
        this.incrementRound();
        await this._introScene.hide();
        await DelayHelper.sleep(300);
        this._gameScene.activate();
    }

    private async nextRound() {
        await this._gameScene.deactivate();
        if (!this.incrementRound()) {
            await this.end();
            return;
        }

        await DelayHelper.sleep(600);
        await this._gameScene.activate();
    }

    private async end() {
        await this._gameScene.deactivate();
        this._endScene.setScore(this._score);
        await DelayHelper.sleep(300);
        await this._endScene.show();
    }

    private initEvents() {
        document.removeEventListener(GameEvents.Start, (event: any) => {});
        document.addEventListener(GameEvents.Start, async () => {
            await this.start();
        });

        document.removeEventListener(GameEvents.NextRound, (event: any) => {});
        document.addEventListener(GameEvents.NextRound, (event: any) => {
            this._score += event.detail;
            // console.log(`Round score: ${event.detail}`);
            // console.log(`SCORE: ${this._score}`);
            this.nextRound();
        });
    }

    private incrementRound(): boolean {
        this._round++;

        if (this._round > this.MAX_ROUND) {
            return false;
        }

        console.log(`Starting round ${this._round}/${this.MAX_ROUND}`);

        return true;
    }
}
