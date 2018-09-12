import {ColorHelper} from "./ColorHelper";

export class GradientHelper {

    public static getTriadicScheme() {
        const seed = Math.floor(Math.random() * 360);

        return [
            this.createRGBstring(seed, GradientAngles.First),
            this.createRGBstring(seed, GradientAngles.Second),
            this.createRGBstring(seed, GradientAngles.Third),
        ];
    }

    private static createRGBstring(seed: number, delta: number, saturation: number = 100, value: number = 100) {
        return ColorHelper.hsv2rgbString(seed + delta, saturation, value);
    }
}

enum GradientAngles {
    FullCircle = 360,
    First = 0,
    Second = 120,
    Third = 240,
}
