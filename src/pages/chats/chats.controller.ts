import { ChatsApi } from '../../core/api/services/chats.api';
import { Chat } from '../../core/api/types/chat';

export class ChatsController {
    private readonly chatsApi = new ChatsApi();

    getChats(): Promise<Chat[]> {
        return this.chatsApi.get();
    }
}
