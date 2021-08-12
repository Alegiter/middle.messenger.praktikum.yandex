import Component, { ComponentProperties } from '../component';
import { Handlebars } from '../../utils/handlebars';

type ButtonProperties = ComponentProperties<HTMLButtonElement> & {
    text: string;
    type?: 'button' | 'link';
};

export default class Button extends Component<ButtonProperties> {
    constructor(properties: ButtonProperties) {
        super('button', properties);
    }

    get element(): HTMLButtonElement {
        return super.element as HTMLButtonElement;
    }

    onComponentDidMount(): void {
        this.addStyles();
    }

    onRender(): string | null {
        // todo [sitnik] пока роутера нет
        const { text } = this.properties;

        return Handlebars.compile(`{{text}}`)({ text });
    }

    private addStyles() {
        this.element.classList.add('button');
        if (this.properties.type === 'link') {
            this.element.classList.add('button_link');
        }
    }
}
