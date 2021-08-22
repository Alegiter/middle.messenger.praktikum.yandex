import { Router } from '../../core/utils/routing/router';
import { Login } from '../login/login';
import { Registration } from '../registration/registration';
import { Profile } from '../profile/profile';
import { Routes } from '../../core/utils/routing/routes';
import { ProfileEdit } from '../profile/edit/edit';
import { ProfilePasswordChange } from '../profile/password/change';
import { AuthApi } from '../../core/api/services/auth.api';
import { Chat } from '../chats/components/chat/chat';
import Avatar from '../../core/components/avatar/avatar';
import { renderer2 } from '../../core/utils/renderer';
import { ChatList } from '../chats/components/chat-list/chat-list';
import { ChatsApi } from '../../core/api/services/chats.api';
import { Chats } from '../chats/chats';

Router.withRoute(Routes.LOGIN, Login)
    .withRoute(Routes.SIGNUP, Registration)
    .withRoute(Routes.SETTINGS, Profile)
    .withRoute(Routes.SETTINGS_EDIT, ProfileEdit)
    .withRoute(Routes.SETTINGS_PASSWORD_CHANGE, ProfilePasswordChange)
    .withRoute(Routes.MESSENGER, Chats)
    .start();

// Simple check for unauthorized user
const authApi = new AuthApi();
authApi.getUser().catch(() => Router.go(Routes.LOGIN));

const test = new ChatList({
    chats: [
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
            id: 1
        }),
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
            id: 2
        }),
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
            id: 3
        }),
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
            id: 4
        }),
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
            id: 5
        })
    ]
});
// renderer2(test.element);
