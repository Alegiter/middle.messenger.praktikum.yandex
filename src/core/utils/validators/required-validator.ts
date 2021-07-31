import { ValidationError, Validator } from './validator';

export default class RequireValidator implements Validator {
    valid(input: HTMLInputElement): ValidationError | null {
        if (input.value) {
            return null;
        }

        return {
            validatorName: 'required',
            valid: false,
            message: 'Обязательное поле'
        };
    }
}
