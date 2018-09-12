import {RgbInterface} from "../interfaces/RgbInterface";

export class HexToRgbConversionError extends Error {
    public constructor(rgb1: RgbInterface | null, rgb2: RgbInterface | null) {
        if (rgb1 === null || rgb2 === null) {
            super(`Couldnt convert color HEX to RGB`);
        }
    }
}
