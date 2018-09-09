export class RandomColorError extends Error {
    public constructor() {
        super(`Couldn't pick random color`);
    }
}