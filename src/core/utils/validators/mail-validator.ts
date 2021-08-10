import { ValidationError, Validator } from './validator';
import { emailRegexp } from '../constants';

export default class MailValidator implements Validator {
    valid(input: HTMLInputElement): ValidationError | null {
        const valid = emailRegexp.test(input.value);

        return valid
            ? null
            : {
                  validatorName: 'mail',
                  valid: false,
                  message: 'Почта указана некорректно'
              };
    }
}
