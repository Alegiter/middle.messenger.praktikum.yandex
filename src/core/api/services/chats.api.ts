import HttpClient from '../../http/http-client';
import { ChatsRequest } from '../types/chats-request';
import { Chat } from '../types/chat';
import { ChatCreateRequest } from '../types/chat-create-request';
import { ApiResponseError } from '../../utils/errors/api-response-error';
import { ChatAddUsersRequest } from '../types/chat-add-users-request';
import { ChatRemoveUsersRequest } from '../types/chat-remove-users-request';
import { apiUrl } from '../../utils/constants';
import { ChatCreateResponse } from '../types/chat-create-response';
import { ChatTokenResponse } from '../types/chat-token-response';
import { User } from '../types/user';

export class ChatsApi {
    private readonly http = new HttpClient(`${apiUrl}/chats`);

    get(data?: ChatsRequest): Promise<Chat[]> {
        return this.http.get('', { body: data }).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }

    create(data: ChatCreateRequest): Promise<ChatCreateResponse> {
        return this.http.post('', { body: data }).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }

    addUsers(data: ChatAddUsersRequest): Promise<void> {
        return this.http.put('/users', { body: data }).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }

    // todo [sitnik] надо сделать
    removeUsers(data: ChatRemoveUsersRequest): Promise<void> {
        return this.http.delete('/users', { body: data }).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }

    token(chatId: number): Promise<ChatTokenResponse> {
        return this.http.post(`/token/${chatId}`).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }

    /**
     * Вопрос!
     *
     * Возвращает 404
     * Может быть где-то неправильно строю запрос, глаза уже замылились
     */

    users(data: { id: number }): Promise<User[]> {
        return this.http.post(`/${data.id}/users`).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }
}
