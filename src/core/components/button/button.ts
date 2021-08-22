import Component, { ComponentChild, ComponentProperties } from '../component';
import { Handlebars } from '../../utils/handlebars';

type ButtonProperties = ComponentProperties<HTMLButtonElement> & {
    text?: string;
    type?: 'button' | 'link';
    rounded?: boolean;
    ghost?: boolean;
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

    onRender(): ComponentChild | ComponentChild[] | null {
        const { text } = this.properties;

        if (text) {
            return Handlebars.compile(`{{text}}`)({ text });
        }
        return super.onRender();
    }

    private addStyles() {
        this.element.classList.add('button');

        const { type, rounded, ghost } = this.properties;
        if (type === 'link') {
            this.element.classList.add('button_link');
        }
        if (rounded) {
            this.element.classList.add('button_rounded');
        }
        if (ghost) {
            this.element.classList.add('button_ghost');
        }
    }
}
