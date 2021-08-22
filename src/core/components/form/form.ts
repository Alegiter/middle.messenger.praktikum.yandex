import Component, { ComponentProperties } from '../component';
import FormItem from './item/form-item';
import Button from '../button/button';

type FormProperties = ComponentProperties<HTMLFormElement> & {
    items: FormItem[];
    submit?: Button;
};

export default class Form extends Component<FormProperties> {
    constructor(properties: FormProperties) {
        super('form', properties);
    }

    get element(): HTMLFormElement {
        return super.element as HTMLFormElement;
    }

    onComponentDidMount(): void {
        this.element.noValidate = true;
        this.element.classList.add('form');
        this.element.addEventListener('submit', (event) => {
            event.preventDefault();
            this.validate();
        });

        if (this.properties.submit) {
            const { html = {} } = this.properties.submit.properties;
            html.type = 'submit';
        }
    }

    onRender(): HTMLElement[] {
        const elements = this.properties.items.map((item) => item.element);
        if (this.properties.submit) {
            return [...elements, this.properties.submit.element];
        }
        return elements;
    }

    validate(): void {
        this.properties.items.forEach((item) => item.validate());
    }

    get valid(): boolean {
        return this.properties.items.reduce<boolean>(
            (validForm: boolean, item: FormItem) => validForm && item.valid,
            true
        );
    }

    get value(): Record<string, string> {
        return this.properties.items.reduce<Record<string, string>>(
            (value, item: FormItem, index: number) => {
                const propertyName =
                    item.properties.input.element.getAttribute('name') || String(index);
                // eslint-disable-next-line no-param-reassign
                value[propertyName] = item.value;
                return value;
            },
            {}
        );
    }

    set value(value: Record<string, string>) {
        Object.entries(value).forEach(([key, val]) => {
            const item = this.properties.items.find(
                (it) => it.properties.input.properties.html?.name === key
            );
            if (item) {
                let htmlProps = item.properties.input.properties.html;
                if (!htmlProps) {
                    htmlProps = {};
                }
                item.properties.input.properties.html = { ...htmlProps, value: val };
            }
        });
    }

    getItemByName(name: string): FormItem | undefined {
        return this.properties.items.find(
            (item) => item.properties.input.properties.html?.name === name
        );
    }
}
