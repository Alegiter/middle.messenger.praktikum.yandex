import HttpClient from '../../http/http-client';
import { ChatsRequest } from '../types/chats-request';
import { Chat } from '../types/chat';
import { ChatCreateRequest } from '../types/chat-create-request';
import { ChatAddUsersRequest } from '../types/chat-add-users-request';
import { ChatRemoveUsersRequest } from '../types/chat-remove-users-request';
import { apiUrl } from '../../utils/constants';
import { ChatCreateResponse } from '../types/chat-create-response';
import { ChatTokenResponse } from '../types/chat-token-response';
import { User } from '../types/user';

export class ChatsApi {
    private readonly http = new HttpClient(`${apiUrl}/chats`);

    get(data?: ChatsRequest): Promise<Chat[]> {
        return this.http.get('', { body: data });
    }

    create(data: ChatCreateRequest): Promise<ChatCreateResponse> {
        return this.http.post('', { body: data });
    }

    addUsers(data: ChatAddUsersRequest): Promise<void> {
        return this.http.put('/users', { body: data });
    }

    removeUsers(data: ChatRemoveUsersRequest): Promise<void> {
        return this.http.delete('/users', { body: data });
    }

    token(chatId: number): Promise<ChatTokenResponse> {
        return this.http.post(`/token/${chatId}`);
    }

    users(data: { id: number }): Promise<User[]> {
        return this.http.get(`/${data.id}/users`);
    }
}
