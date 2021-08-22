import HttpClient from '../../http/http-client';
import { apiUrl } from '../../utils/constants';
import { UserUpdateRequest } from '../types/user-update-request';
import { User } from '../types/user';
import { UserUpdatePasswordRequest } from '../types/user-update-password-request';

export class UserApi {
    private readonly http = new HttpClient(`${apiUrl}/user`);

    update(data: UserUpdateRequest): Promise<User> {
        return this.http.put('/profile', { body: data });
    }

    updateAvatar(data: FormData): Promise<User> {
        return this.http.put('/profile/avatar', {
            body: data
        });
    }

    updatePassword(data: UserUpdatePasswordRequest): Promise<void> {
        return this.http.put('/password', { body: data });
    }

    getUserById(id: number): Promise<User> {
        return this.http.get(`/${id}`);
    }

    getUsersByLogin(login: string): Promise<User[]> {
        return this.http.post('/search', { body: { login } });
    }
}
