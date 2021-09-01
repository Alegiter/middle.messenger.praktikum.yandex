import { ChatsApi } from '../../core/api/services/chats.api';
import { Chat } from '../../core/api/types/chat';
import { ChatsRequest } from '../../core/api/types/chats-request';
import { ChatTokenResponse } from '../../core/api/types/chat-token-response';
import { AuthApi } from '../../core/api/services/auth.api';

export class ChatsController {
    private readonly chatsApi = new ChatsApi();
    private readonly authApi = new AuthApi();

    getChats(data?: ChatsRequest): Promise<Chat[]> {
        return this.chatsApi.get(data);
    }

    getChatToken(chatId: number): Promise<string> {
        return this.chatsApi.token(chatId).then((response: ChatTokenResponse) => {
            return Promise.resolve(response.token);
        });
    }

    getUserId(): Promise<number> {
        return this.authApi.getUser().then((user) => user.id);
    }
}
