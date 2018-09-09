import {RgbInterface} from "../interfaces/RgbInterface";

export class HexToRgbConversionError extends Error {
    public constructor(rgb1: RgbInterface | null, rgb2: RgbInterface | null) {
        if (rgb1 === null) {
            super(`Couldnt convert color HEX1 to RGB`);
        }

        if (rgb2 === null) {
            super(`Couldnt convert color HEX2 to RGB`);
        }
    }
}