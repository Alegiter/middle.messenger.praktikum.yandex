import Component, { ComponentProperties } from '../../core/components/component';
import { ChatsTemplate } from './chats.template.type';
import { ChatsController } from './chats.controller';
import { ChatComponent } from './components/chat/chat';
import { ChatList } from './components/chat-list/chat-list';
import { Handlebars } from '../../core/utils/handlebars';
import template from './chats.template';
import { QuerySelectAppender } from '../../core/utils/query-select-appender';
import Button from '../../core/components/button/button';
import Icon from '../../core/components/icon/icon';
import { AppRouter } from '../../core/utils/routing/router';
import { Routes } from '../../core/utils/routing/routes';
import { Messenger } from './components/messenger/messenger';

type ChatsProperties = ComponentProperties & ChatsTemplate;

export class Chats extends Component<ChatsProperties> {
    private readonly controller = new ChatsController();

    constructor() {
        super('div', {
            chatList: new ChatList({
                onSelect: (chat) => {
                    this.controller.getUserId().then((userId) => {
                        this.controller.getChatToken(chat.id).then((token) => {
                            this.properties.messenger = new Messenger({
                                chat,
                                chatToken: token,
                                userId
                            });
                        });
                    });
                }
            })
        });

        this.loadChats();
    }

    onRender(): string {
        return Handlebars.compile(template)();
    }

    onComponentDidRender(): void {
        const { chatList, messenger } = this.properties;
        const appender = new QuerySelectAppender(this.element)
            .queryAndAppend(
                '.chats__sider',
                new Button({
                    text: 'Профиль',
                    type: 'link',
                    events: {
                        click: () => AppRouter.go(Routes.SETTINGS)
                    }
                }).element
            )
            .queryAndAppend('.chats__sider', chatList.element)
            .queryAndAppend(
                '.chats__sider',
                new Button({
                    children: [new Icon({ name: 'create' }).element],
                    rounded: true,
                    classList: ['chats__create-button'],
                    events: {
                        click: () => {
                            AppRouter.go(Routes.MESSENGER_CHAT_ADD_USERS);
                        }
                    }
                }).element
            );

        if (messenger) {
            appender.queryAndAppend('.chats__messenger', messenger.element);
        }
    }

    private loadChats() {
        this.controller.getChats().then((chats) => {
            this.properties.chatList.properties.chats = chats.map(
                (chat) => new ChatComponent(chat)
            );

            // const test = [];
            // for (let i = 0; i < 100; i++) {
            //     test.push(
            //         new Chat({
            //             avatar: new Avatar({
            //                 initials: 'ВС'
            //             }),
            //             title: 'Владимир Ситник',
            //             unread_count: 1,
            //             last_message: {
            //                 time: '2020-01-02T14:22:22.000Z',
            //                 content: 'Текс длинный, очень, при очень длинный, сильно!'
            //             },
            //             id: i
            //         })
            //     );
            // }
            //
            // this.properties.chatList.properties.chats = [
            //     ...this.properties.chatList.properties.chats,
            //     ...test
            // ];
        });
    }
}
