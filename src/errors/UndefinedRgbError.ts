export class UndefinedRgbError extends Error {
    public constructor(r: number | undefined, g: number | undefined, b: number | undefined) {
        if (r === undefined || g === undefined || b === undefined) {
            super(`RGB color value is undefined`);
        }
    }
}
