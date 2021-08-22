import HttpClient from '../../http/http-client';
import { ChatsRequest } from '../types/chats-request';
import { Chat } from '../types/chat';
import { ChatCreateRequest } from '../types/chat-create-request';
import { ApiResponseError } from '../../utils/errors/api-response-error';
import { ChatAddUsersRequest } from '../types/chat-add-users-request';
import { ChatRemoveUsersRequest } from '../types/chat-remove-users-request';
import { apiUrl } from '../../utils/constants';

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

    create(data: ChatCreateRequest): Promise<void> {
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

    // todo [sitnik] проверить, что присылает
    token(chatId: number): Promise<any> {
        return this.http.post(`/token/${chatId}`).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }
}
