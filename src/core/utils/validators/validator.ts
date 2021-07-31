export type ValidationError = {
    valid: boolean;
    validatorName: string;
    message: string;
};

export interface Validator {
    valid(input: HTMLInputElement): ValidationError | null;
}
