import Component, {
    ComponentProperties
} from '../../../../../../core/components/component';
import { User } from '../../../../../../core/api/types/user';
import { Handlebars } from '../../../../../../core/utils/handlebars';
import template from './message.template';
import { QuerySelectAppender } from '../../../../../../core/utils/query-select-appender';
import Avatar from '../../../../../../core/components/avatar/avatar';
import {
    avatarHrefFromUser,
    initialsFromUser
} from '../../../../../../core/utils/user-untils';
import '../../../../../../markup/helpers/if-equals.helper';

type MessageOptions = {
    message: {
        author: User;
        text: string;
        time: string;
    };
    side: 'left' | 'right';
};

type MessageProperties = ComponentProperties &
    MessageOptions & {
        avatar: Avatar;
    };

export class Message extends Component<MessageProperties> {
    constructor(options: MessageOptions) {
        super('div', {
            ...options,
            avatar: new Avatar({
                href: avatarHrefFromUser(options.message.author),
                initials: initialsFromUser(options.message.author)
            }),
            classList: [
                'message',
                options.side === 'left' ? 'message_left' : 'message_right'
            ]
        });
    }

    onRender(): string {
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender(): void {
        const { avatar } = this.properties;
        new QuerySelectAppender(this.element).queryAndAppend(
            '.message__avatar',
            avatar.element
        );
    }
}
