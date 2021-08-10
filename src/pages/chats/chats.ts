import '../../markup/partials/avatar/avatar.partial';
import '../../markup/partials/chat/chat.partial';
import template from './chats.template';
import renderer from '../../core/utils/renderer';

const context = {
    avatar: {
        initials: 'ВС'
    },
    chats: [
        {
            avatar: {
                initials: 'ИИ'
            },
            name: 'Иван Иванов',
            lastMessage: {
                text: 'Привет, как дела?',
                time: '14:33'
            }
        },
        {
            avatar: {
                initials: 'ПП'
            },
            name: 'Петя Петров',
            lastMessage: {
                text: 'Ответь уже!!!',
                time: 'Mon'
            },
            unreadMessages: 10
        }
    ]
};

renderer(template, context);
