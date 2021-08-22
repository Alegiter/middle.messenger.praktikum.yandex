import Component, { ComponentProperties } from '../component';
import { Handlebars } from '../../utils/handlebars';
import Button from '../button/button';
import Icon from '../icon/icon';

type HeaderProperties = ComponentProperties & {
    stick?: {
        top: boolean;
    };
    back?: {
        click: () => void;
    };
    title: {
        value: string;
        centered?: boolean;
    };
    exit?: {
        click: () => void;
    };
};

export default class Header extends Component<HeaderProperties> {
    constructor(properties?: HeaderProperties) {
        super('header', properties);
    }

    get element(): HTMLHeadElement {
        return super.element as HTMLInputElement;
    }

    onComponentDidMount(): void {
        this.addStyles();
    }

    onRender(): HTMLElement | (HTMLElement | string)[] | string | null {
        return Handlebars.compile(
            `<div class="header__title {{#if title.centered}} header__title_centered {{/if}}">{{ title.value }}</div>`
        )(this.properties);
    }

    onComponentDidRender(): void {
        const { back, exit } = this.properties;
        const appendButton = (
            icon: string,
            position: InsertPosition,
            click: () => void
        ) => {
            const btn = new Component('div', {
                children: [
                    new Button({
                        rounded: true,
                        ghost: true,
                        children: [new Icon({ name: icon }).element],
                        events: {
                            click: () => {
                                click();
                            }
                        }
                    }).element
                ]
            });
            this.element.insertAdjacentElement(position, btn.element);
        };

        if (back) {
            appendButton('arrow_back', 'afterbegin', back.click);
        }
        if (exit) {
            appendButton('logout', 'beforeend', exit.click);
        }
    }

    private addStyles() {
        this.element.classList.add('header');

        const { stick } = this.properties;
        if (stick) {
            this.element.classList.toggle('header_top-stick', stick.top);
        }
    }
}
