import Component, {
    ComponentChild,
    ComponentProperties
} from '../../../../core/components/component';
import { ChatListTemplate } from './chat-list.template.type';
import { Chat } from '../../../../core/api/types/chat';

type ChatListProperties = ComponentProperties & ChatListTemplate;

export class ChatList extends Component<ChatListProperties> {
    constructor(options: { onSelect: (chat: Chat) => void }) {
        super('div', {
            chats: [],
            classList: ['chat-list'],
            events: {
                click: (event) => {
                    const { chats } = this.properties;
                    chats.forEach((chat) => {
                        chat.select(false);
                    });
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const selectedChat = chats.find(
                        (chat) =>
                            chat.properties.id.toString() ===
                            (<HTMLElement>event.target).id
                    )!;
                    const chat = selectedChat.select();
                    options.onSelect(chat);
                }
            }
        });
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
}
