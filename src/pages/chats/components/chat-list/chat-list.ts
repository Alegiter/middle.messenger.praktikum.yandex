import Component, {
    ComponentChild,
    ComponentProperties
} from '../../../../core/components/component';
import { ChatListTemplate } from './chat-list.template.type';
import Button from '../../../../core/components/button/button';
import Icon from '../../../../core/components/icon/icon';

type ChatListProperties = ComponentProperties & ChatListTemplate;

export class ChatList extends Component<ChatListProperties> {
    private selectedChatId: number | null = null;

    constructor(properties?: ChatListProperties) {
        super('div', properties);
    }

    onComponentDidMount(): void {
        this.element.classList.add('chat-list');
        this.manageChatSelecting();
    }

    onRender(): ComponentChild[] {
        const children: ComponentChild[] = [];
        if (this.properties.chats && this.properties.chats.length > 0) {
            children.push(...this.properties.chats.map((chat) => chat.element));
        } else {
            children.push('У вас нет чатов');
        }

        return children;
    }

    private manageChatSelecting() {
        this.element.addEventListener('click', (event) => {
            this.properties.chats.forEach((chat) => {
                chat.select(false);
            });
            const selectedChat = this.properties.chats.find(
                (chat) => chat.properties.id.toString() === (<HTMLElement>event.target).id
            );
            selectedChat?.select();
        });
    }
}
