import Component, { ComponentProperties } from '../../component';
import Input from '../../input/input';
import { Validator } from '../../../utils/validators/validator';
import { Handlebars } from '../../../utils/handlebars';
import './partial';

type FormItemProperties = ComponentProperties & {
    title: string;
    input: Input;
    validation?: {
        validateOn: 'focus' | 'blur';
        validators: Validator[];
    };
    validationMessage?: string;
};

export default class FormItem extends Component<FormItemProperties> {
    constructor(properties: FormItemProperties) {
        super('div', properties);
    }

    get element(): HTMLDivElement {
        return super.element as HTMLDivElement;
    }

    onComponentDidMount(properties: FormItemProperties): void {
        if (properties.validation) {
            const { validateOn, validators = [] } = properties.validation;
            properties.input.element.addEventListener(validateOn, () => {
                this.properties.validationMessage = '';
                // eslint-disable-next-line no-restricted-syntax
                for (const validator of validators) {
                    const validationError = validator.valid(properties.input.element);
                    if (validationError) {
                        this.setError(validationError.message);
                        break;
                    }
                }
            });
        }
    }

    onRender(): string {
        const { title, validationMessage } = this.properties;
        return Handlebars.compile('{{> formItem this}}')({ title, validationMessage });
    }

    onComponentDidRender(): void {
        const inputWrapper = this.element.querySelector('.form__item-input-wrapper');
        if (inputWrapper) {
            inputWrapper.appendChild(this.properties.input.element);
        }
    }

    validate(): void {
        this.properties.input.element.focus();
        this.properties.input.element.blur();
    }

    get valid(): boolean {
        return !this.properties.validationMessage;
    }

    get value(): string {
        return this.properties.input.element.value;
    }

    setError(message: string): void {
        this.properties.validationMessage = message;
    }
}
