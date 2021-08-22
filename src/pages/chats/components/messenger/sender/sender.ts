import Component, { ComponentProperties } from '../../../../../core/components/component';
import Input from '../../../../../core/components/input/input';
import Button from '../../../../../core/components/button/button';
import Icon from '../../../../../core/components/icon/icon';
import { Handlebars } from '../../../../../core/utils/handlebars';
import template from './sender.template';
import { QuerySelectAppender } from '../../../../../core/utils/query-select-appender';

type SenderProperties = ComponentProperties & {
    input: Input;
    button: Button;
};

export class Sender extends Component<SenderProperties> {
    constructor(private options: { onSend: (message: string) => void }) {
        super('div', {
            classList: ['sender'],
            input: new Input({
                classList: ['sender__input']
            }),
            button: new Button({
                children: [new Icon({ name: 'send' }).element],
                events: {
                    click: () => {
                        this.send();
                    }
                }
            })
        });
    }

    onRender(): string {
        return Handlebars.compile(template)();
    }

    onComponentDidRender(): void {
        const { input, button } = this.properties;
        new QuerySelectAppender(this.element)
            .queryAndAppend('.sender__input-wrapper', input.element)
            .queryAndAppend('.sender__button', button.element);
    }

    private send(): void {
        const { input } = this.properties;
        const { value } = input.element;
        if (value && value.length !== 0) {
            this.options.onSend(value);
        }
    }
}
