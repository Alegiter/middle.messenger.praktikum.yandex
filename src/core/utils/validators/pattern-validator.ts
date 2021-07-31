import { ValidationError, Validator } from './validator';

export default class PatternValidator implements Validator {
    // eslint-disable-next-line no-useless-constructor
    constructor(private pattern: string | RegExp) {}

    valid(input: HTMLInputElement): ValidationError | null {
        const valid = new RegExp(this.pattern).test(input.value);

        return valid
            ? null
            : {
                  validatorName: 'pattern',
                  valid: false,
                  message: `Не удовлетворят паттерну: ${this.pattern}`
              };
    }
}
