import {BaseScene} from "./BaseScene";
import {Gradient} from "../models/Gradient";
import {Color} from "../models/Color";
import {SceneSelectors} from "../enum/Selectors";
import {Task} from "../models/Task";
import {GameEvents} from "../enum/GameEvents";
import {ColorHelper} from "../helpers/ColorHelper";

export class GameScene extends BaseScene {

    private _color: Color;
    private _gradient: Gradient;
    private _task: Task;

    public constructor() {
        super();
        this._wrapper = document.querySelector(SceneSelectors.GameScene);
        this._task = new Task();
        this._gradient = new Gradient();

        this.setNewColor();
        this.initEvents();
    }

    public activate() {
        super.show();
        this.setNewColor();
        this._gradient.activate();
    }

    public deactivate() {
        super.hide();
        this._gradient.deactivate();
    }

    private setNewColor() {
        this._color = new Color();
        this._gradient.draw(this._color);
        this._task.colorName = this._color.name;
    }

    private initEvents() {
        document.addEventListener(GameEvents.ColorPicked, (event: any) => {
            let difference = ColorHelper.colorDiffHex(event.detail, this._color.hex);
            document.dispatchEvent(new CustomEvent(GameEvents.NextRound, {detail: parseFloat(difference)}));
        })
    }


}