import {GameEvents} from "./enum/GameEvents";
import {DelayHelper} from "./helpers/DelayHelper";
import {Round} from "./models/Round";
import {EndScene} from "./scenes/EndScene";
import {GameScene} from "./scenes/GameScene";
import {IntroScene} from "./scenes/IntroScene";

export class Game {
    private readonly MAX_ROUND = 5;
    private _introScene: IntroScene;
    private _gameScene: GameScene;
    private _endScene: EndScene;
    private _round: Round;

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
        this._round = new Round(this.MAX_ROUND);
        this._round.increment();
        await this._endScene.hide();
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
        this._endScene.setScore(this._round.score);
        await DelayHelper.sleep(300);
        await this._endScene.show();
    }

    private initEvents() {
        document.removeEventListener(GameEvents.Start, (event: any) => {/**/});
        document.addEventListener(GameEvents.Start, async () => {
            await this.start();
        });

        document.removeEventListener(GameEvents.NextRound, (event: any) => {/**/});
        document.addEventListener(GameEvents.NextRound, (event: any) => {
            this._round.addScore(event.detail);
            // console.log(`Round score: ${event.detail}`);
            // console.log(`SCORE: ${this._score}`);
            this.nextRound();
        });
    }

    private incrementRound(): boolean {
        this._round.increment();

        if (this._round.value > this.MAX_ROUND) {
            return false;
        }

        return true;
    }
}
