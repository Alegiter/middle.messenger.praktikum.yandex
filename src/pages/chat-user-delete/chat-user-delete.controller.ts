import { ChatsApi } from '../../core/api/services/chats.api';
import { User } from '../../core/api/types/user';
import { AppStorage } from '../../core/storage/storage';
import { AuthApi } from '../../core/api/services/auth.api';

export class ChatUserDeleteController {
    private chatApi = new ChatsApi();
    private authApi = new AuthApi();

    get currentChatId(): number {
        const chatId = AppStorage.query<number>('chat-current-id');
        if (chatId) {
            return chatId;
        }
        throw new Error('ChatID is missing');
    }

    getChatUsers(): Promise<User[]> {
        const chatId = AppStorage.query<number>('chat-current-id');
        if (chatId) {
            return this.chatApi
                .users({ id: chatId })
                .then((users: User[]) => Promise.all([users, this.authApi.getUser()]))
                .then((data: [User[], User]) => {
                    const [users, user] = data;
                    return Promise.resolve(users.filter((u) => u.id !== user.id));
                });
        }
        return Promise.reject();
    }

    deleteUsersFromChat(users: User[]): Promise<void> {
        const chatId = AppStorage.query<number>('chat-current-id');
        if (chatId) {
            return this.chatApi.removeUsers({
                users: users.map((u) => u.id),
                chatId
            });
        }
        throw new Error('ChatID is missing');
    }
}
