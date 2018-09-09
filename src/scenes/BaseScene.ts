import {SceneInterface} from "../interfaces/SceneInterface";
import {Modifiers} from "../enum/Modifiers";

export class BaseScene implements SceneInterface{
    protected _wrapper: any;

    public async hide(): Promise<void> {
        this._wrapper.classList.add(Modifiers.Hidden);
    }

    public async show(): Promise<void> {
        this._wrapper.classList.remove(Modifiers.Hidden);
    }

}