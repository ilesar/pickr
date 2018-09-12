import {Colors} from "../Colors";
import {GradientHelper} from "../helpers/GradientHelper";

export class Color {

    private _colors: any = Colors.getDataset();
    private _name: string;
    private _hex: string;
    private _gradientColors: string[];

    constructor() {
        this.initialize();
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get hex(): string {
        return this._hex;
    }

    public set hex(value: string) {
        this._hex = value;
    }

    public get gradientColors(): string[] {
        return this._gradientColors;
    }

    public set gradientColors(value: string[]) {
        this._gradientColors = value;
    }

    private initialize() {
        let count: number = 0;

        for (const property in this._colors) {
            if (Math.random() < 1 / ++count) {
                this._name = property;
            }
        }

        this._hex = this._colors[this._name];
        // this._gradientColors = GradientHelper.getTriadicScheme();
        this._gradientColors = GradientHelper.getTriadicScheme();
    }

}
