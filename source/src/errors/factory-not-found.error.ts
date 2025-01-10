export class FactoryNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FactoryNotFound";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FactoryNotFound);
        }
    }
}