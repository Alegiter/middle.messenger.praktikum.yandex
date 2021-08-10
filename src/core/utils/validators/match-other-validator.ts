import { ValidationError, Validator } from './validator';

export default class MatchOtherValidator implements Validator {
    // eslint-disable-next-line no-useless-constructor
    constructor(private otherInput: HTMLInputElement) {}

    valid(input: HTMLInputElement): ValidationError | null {
        const same = input.value === this.otherInput.value;

        return same
            ? null
            : {
                  validatorName: 'matchother',
                  valid: false,
                  message: `Значения не совпадают`
              };
    }
}
