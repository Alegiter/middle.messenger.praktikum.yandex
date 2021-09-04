import Component, {
    ComponentChild,
    ComponentProperties
} from '../../../../../core/components/component';
import { Message } from './message/message';

export class MessageList extends Component<ComponentProperties> {
    constructor() {
        super('div', {
            classList: ['message-list'],
            children: []
        });
    }

    onRender(): ComponentChild | ComponentChild[] | null {
        return super.onRender();
    }

    addMessage(message: Message): void {
        this.element.appendChild(message.element);
        this.element.scrollTop = this.element.scrollHeight;
    }
}
