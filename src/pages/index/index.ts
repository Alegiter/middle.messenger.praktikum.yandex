import { AppRouter } from '../../core/utils/routing/router';
import { Login } from '../login/login';
import { Registration } from '../registration/registration';
import { Profile } from '../profile/profile';
import { Routes } from '../../core/utils/routing/routes';
import { ProfileEdit } from '../profile/edit/edit';
import { ProfilePasswordChange } from '../profile/password/change';
import { AuthApi } from '../../core/api/services/auth.api';
import { Chats } from '../chats/chats';
import { ChatUserAdd } from '../chat-user-add/chat-user-add';
import '../../core/storage/storage';
import { ChatCreate } from '../chat-create/chat-create';
import { ChatUserDelete } from '../chat-user-delete/chat-user-delete';
import './index.pcss';

AppRouter.withRoute(Routes.LOGIN, Login)
    .withRoute(Routes.SIGNUP, Registration)
    .withRoute(Routes.SETTINGS, Profile)
    .withRoute(Routes.SETTINGS_EDIT, ProfileEdit)
    .withRoute(Routes.SETTINGS_PASSWORD_CHANGE, ProfilePasswordChange)
    .withRoute(Routes.MESSENGER, Chats)
    .withRoute(Routes.MESSENGER_CHAT_ADD_USERS, ChatUserAdd)
    .withRoute(Routes.MESSENGER_CHAT_CREATE, ChatCreate)
    .withRoute(Routes.MESSENGER_CHAT_REMOVE_USERS, ChatUserDelete)
    .start();

// Simple check for unauthorized user
const authApi = new AuthApi();
authApi
    .getUser()
    .then(() => {
        if (AppRouter.currentRoutePath === Routes.LOGIN) {
            AppRouter.go(Routes.MESSENGER);
        }
    })
    .catch(() => AppRouter.go(Routes.LOGIN));
