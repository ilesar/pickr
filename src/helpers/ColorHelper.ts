import {HexToRgbConversionError} from "../errors/HexToRgbConversionError";
import {UndefinedRgbError} from "../errors/UndefinedRgbError";

export abstract class ColorHelper {
    public static hsv2rgb(h: number, s: number, v: number) {
        h /= 100;
        s /= 100;
        v /= 100;
        let r, g, b, i, f, p, q, t;

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        if (r === undefined || g === undefined || b === undefined) {
            throw new UndefinedRgbError(r, g, b);
        }

        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255),
        ];
    }

    public static hsv2rgbString(h: number, s: number, v: number) {
        const rgbValue = ColorHelper.hsv2rgb(h, s, v);

        return rgbValue.join(",");
    }

    public static rgbToHex(r: number, g: number, b: number) {
        if (r > 255 || g > 255 || b > 255) {
            throw new Error("Invalid color component");
        }
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    public static hexToRgb(hex: string) {
        const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (result === null) {
            return {
                r: 9999,
                g: 9999,
                b: 9999,
            };
        }

        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        };
    }

    public static colorDiffHex(hex1: string, hex2: string): number {
        const rgb1 = ColorHelper.hexToRgb(hex1);
        const rgb2 = ColorHelper.hexToRgb(hex2);

        if (rgb1 === null || rgb2 === null) {
            throw new HexToRgbConversionError(rgb1, rgb2);
        }

        const value = Math.sqrt(
            Math.pow(rgb1.r - rgb2.r, 2) +
                Math.pow(rgb1.g - rgb2.g, 2) +
                Math.pow(rgb1.b - rgb2.b, 2),
        );

        const maxValue = Math.sqrt(
            Math.pow(255, 2) +
                Math.pow(255, 2) +
                Math.pow(255, 2),
        );

        return (value / maxValue * 100);
    }
}
