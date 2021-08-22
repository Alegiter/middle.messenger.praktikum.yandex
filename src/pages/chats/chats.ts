import Component, { ComponentProperties } from '../../core/components/component';
import { ChatsTemplate } from './chats.template.type';
import { ChatsController } from './chats.controller';
import { Chat } from './components/chat/chat';
import Avatar from '../../core/components/avatar/avatar';
import { initialsFromUser } from '../../core/utils/naming-untils';
import { ChatList } from './components/chat-list/chat-list';
import { Handlebars } from '../../core/utils/handlebars';
import template from './chats.template';
import { QuerySelectAppender } from '../../core/utils/query-select-appender';
import Button from '../../core/components/button/button';
import Icon from '../../core/components/icon/icon';

type ChatsProperties = ComponentProperties & ChatsTemplate;

export class Chats extends Component<ChatsProperties> {
    private readonly controller = new ChatsController();

    constructor() {
        super('div', { chatList: new ChatList() });

        this.loadChats();
    }

    onRender(): string {
        return Handlebars.compile(template)();
    }

    onComponentDidRender(): void {
        const { chatList } = this.properties;
        new QuerySelectAppender(this.element)
            .queryAndAppend('.chats__sider', chatList.element)
            .queryAndAppend(
                '.chats__sider',
                new Button({
                    children: [new Icon({ name: 'create' }).element],
                    rounded: true,
                    classList: ['chats__create-button'],
                    events: {
                        click: () => {
                            this.createChatMode();
                        }
                    }
                }).element
            );
    }

    private loadChats() {
        this.controller.getChats().then((chats) => {
            this.properties.chatList.properties.chats = chats.map(
                (chat) =>
                    new Chat({
                        id: chat.id,
                        avatar: new Avatar({
                            initials: chat.last_message
                                ? initialsFromUser(chat.last_message.user)
                                : undefined,
                            href: chat.avatar || chat.last_message?.user.avatar
                        }),
                        unread_count: chat.unread_count,
                        last_message: chat.last_message,
                        title: chat.title
                    })
            );

            const test = [];
            for (let i = 0; i < 100; i++) {
                test.push(
                    new Chat({
                        avatar: new Avatar({
                            initials: 'ВС'
                        }),
                        title: 'Владимир Ситник',
                        unread_count: 1,
                        last_message: {
                            time: '2020-01-02T14:22:22.000Z',
                            content: 'Текс длинный, очень, при очень длинный, сильно!'
                        },
                        id: i
                    })
                );
            }

            this.properties.chatList.properties.chats = [
                ...this.properties.chatList.properties.chats,
                ...test
            ];
        });
    }

    private createChatMode() {
        console.log('crete chat mode');
        // todo [sitnik] включить создание чата
    }
}
