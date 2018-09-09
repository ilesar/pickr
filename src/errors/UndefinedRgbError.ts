export class UndefinedRgbError extends Error {
    public constructor(r: number | undefined, g: number | undefined, b: number | undefined) {
        if (r === undefined) {
            super(`R color value is undefined`);
        }

        if (g === undefined) {
            super(`G color value is undefined`);
        }

        if (b === undefined) {
            super(`B color value is undefined`);
        }
    }
}