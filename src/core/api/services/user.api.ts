import HttpClient from '../../http/http-client';
import { apiUrl } from '../../utils/constants';
import { UserUpdateRequest } from '../types/user-update-request';
import { User } from '../types/user';
import { UserUpdatePasswordRequest } from '../types/user-update-password-request';
import { ApiResponseError } from '../../utils/errors/api-response-error';

export class UserApi {
    private readonly http = new HttpClient(`${apiUrl}/user`);

    update(data: UserUpdateRequest): Promise<User> {
        return this.http.put('/profile', { body: data }).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }

    updateAvatar(data: FormData): Promise<User> {
        return this.http
            .put('/profile/avatar', {
                body: data
            })
            .then((xhr) => {
                switch (xhr.status) {
                    case 200:
                        return Promise.resolve(xhr.response);
                    default:
                        return Promise.reject(new ApiResponseError(xhr.response));
                }
            });
    }

    updatePassword(data: UserUpdatePasswordRequest): Promise<void> {
        return this.http.put('/password', { body: data }).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve();
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }

    getUserById(id: number): Promise<User> {
        return this.http.get(`/${id}`).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }

    getUsersByLogin(login: string): Promise<User[]> {
        return this.http.post('/search', { body: { login } }).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                default:
                    return Promise.reject(new ApiResponseError(xhr.response));
            }
        });
    }
}
