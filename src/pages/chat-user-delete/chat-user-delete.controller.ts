import { ChatsApi } from '../../core/api/services/chats.api';
import { User } from '../../core/api/types/user';
import { AppStorage } from '../../core/storage/storage';

export class ChatUserDeleteController {
    private chatApi = new ChatsApi();

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
            return this.chatApi.users({ id: chatId });
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
