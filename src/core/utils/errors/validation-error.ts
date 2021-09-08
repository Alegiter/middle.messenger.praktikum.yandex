export class ValidationError extends Error {
    constructor(public readonly targetName: string, public readonly message: string) {
        super();
    }
}
