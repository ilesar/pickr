import stackTraceFilter = Mocha.utils.stackTraceFilter;

export class MethodNotImplementedError extends Error {
    public constructor() {
        super(`Method not yet implemented!`);
    }
}