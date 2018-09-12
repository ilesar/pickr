import {GameEvents} from "../enum/GameEvents";
import {SceneSelectors} from "../enum/Selectors";
import {ColorHelper} from "../helpers/ColorHelper";
import {DelayHelper} from "../helpers/DelayHelper";
import {Color} from "../models/Color";
import {Gradient} from "../models/Gradient";
import {Task} from "../models/Task";
import {BaseScene} from "./BaseScene";

export class GameScene extends BaseScene {

    protected _wrapper: any;
    private _color: Color;
    private _gradient: Gradient;
    private _task: Task;
    private _epsilon: number;

    public constructor() {
        super();
        this._wrapper = document.querySelector(SceneSelectors.GameScene);
        this._task = new Task();
        this._gradient = new Gradient();

        this.setNewColor();
        this.initEvents();
    }

    public async activate(): Promise<void> {

        while (true) {
            if (await this.setNewColor()) {
                await DelayHelper.sleep(1000);
                break;
            }
        }

        await this._gradient.activate();
        // await DelayHelper.sleep(300);
        await this._task.show();
    }

    public async deactivate() {
        await this._task.hide();
        await this._gradient.deactivate();
    }

    private setNewColor() {
        this._color = new Color();
        this._epsilon = this._gradient.draw(this._color);
        this._task.colorName = this._color.name;

        return true;
    }

    private initEvents() {
        document.removeEventListener(GameEvents.ColorPicked, (event: any) => {/**/});
        document.addEventListener(GameEvents.ColorPicked, (event: any) => {
            const difference = ColorHelper.colorDiffHex(event.detail, this._color.hex) - this._epsilon;
            document.dispatchEvent(new CustomEvent(GameEvents.NextRound, {detail: difference}));
        });
    }

}
