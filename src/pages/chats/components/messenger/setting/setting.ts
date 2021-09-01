import Component, {
    ComponentChild,
    ComponentProperties
} from '../../../../../core/components/component';
import Avatar from '../../../../../core/components/avatar/avatar';
import Button from '../../../../../core/components/button/button';
import Icon from '../../../../../core/components/icon/icon';
import { Chat } from '../../../../../core/api/types/chat';
import { Routes } from '../../../../../core/utils/routing/routes';
import { AppRouter } from '../../../../../core/utils/routing/router';
import { AppStorage } from '../../../../../core/storage/storage';

type MessengerSettingProperties = ComponentProperties & {
    chat: {
        avatar: Avatar;
        name: string;
    };
    userDelete: Button;
};

export class MessengerSettings extends Component<MessengerSettingProperties> {
    constructor(options: { chat: Pick<Chat, 'id' | 'title' | 'avatar'> }) {
        super('div', {
            classList: ['setting'],
            chat: {
                avatar: new Avatar({
                    href: options.chat.avatar
                }),
                name: options.chat.title
            },
            userDelete: new Button({
                rounded: true,
                block: false,
                children: [new Icon({ name: 'person_remove' }).element],
                events: {
                    click: () => {
                        AppStorage.store('chat-current-id', options.chat.id);
                        AppRouter.go(Routes.MESSENGER_CHAT_REMOVE_USERS);
                    }
                }
            })
        });
    }

    onRender(): ComponentChild[] {
        const { chat, userDelete } = this.properties;
        return [
            new Component('div', {
                classList: ['setting__title'],
                children: [chat.avatar.element, chat.name]
            }).element,
            new Component('div', {
                classList: ['setting__actions'],
                children: [userDelete.element]
            }).element
        ];
    }
}
