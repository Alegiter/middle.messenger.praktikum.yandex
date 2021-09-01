import Component, { ComponentProperties } from '../../../../core/components/component';
import { ChatTemplate } from './chat.template.type';
import template from './chat.template';
import { QuerySelectAppender } from '../../../../core/utils/query-select-appender';
import { Handlebars } from '../../../../core/utils/handlebars';
import { getTodayRelativelyDateStringFromISOString } from '../../../../core/utils/date-utils';
import { Chat } from '../../../../core/api/types/chat';
import Avatar from '../../../../core/components/avatar/avatar';
import { initialsFromUser } from '../../../../core/utils/user-untils';

type ChatProperties = ComponentProperties & ChatTemplate;

export class ChatComponent extends Component<ChatProperties> {
    constructor(private chat: Chat) {
        super('div', {
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
        });
    }

    onRender(): string {
        this.convertLastMessageTime();
        this.shortLastMessageContent();
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender(): void {
        new QuerySelectAppender(this.element).queryAndAppend(
            '.chat__avatar',
            this.properties.avatar.element
        );
    }

    private convertLastMessageTime(): void {
        const { last_message } = this.properties;
        if (last_message) {
            last_message.time = getTodayRelativelyDateStringFromISOString(
                last_message.time
            );
        }
    }

    private shortLastMessageContent(): void {
        const { last_message } = this.properties;
        if (last_message) {
            const { length } = last_message.content;
            if (length > 25) {
                last_message.content = `${last_message.content.substr(0, 25).trim()}...`;
            }
        }
    }

    select(toggle = true): Chat {
        this.properties.selected = toggle;
        return this.chat;
    }
}
