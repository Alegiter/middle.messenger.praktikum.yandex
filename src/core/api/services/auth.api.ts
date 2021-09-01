import HttpClient from '../../http/http-client';
import { User } from '../types/user';
import { SignInRequest } from '../types/sign-in-request';
import { SignUpRequest } from '../types/sign-up-request';
import { SignUpResponse } from '../types/sign-up-response';
import { apiUrl } from '../../utils/constants';

export class AuthApi {
    private readonly http = new HttpClient(`${apiUrl}/auth`);

    getUser(): Promise<User> {
        return this.http.get('/user').then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                case 400:
                case 401:
                case 500:
                default:
                    console.log('AuthApi.getUser error', xhr.response);
                    return Promise.reject(xhr.response);
            }
        });
    }

    signIn(data: SignInRequest): Promise<void> {
        return this.http.post('/signin', { body: data }).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve();
                case 404:
                    return Promise.reject(new Error('Пользователь не найден'));
                case 400:
                case 401:
                case 500:
                default:
                    console.log('AuthApi.signIn error', xhr.response);
                    return Promise.reject(xhr.response);
            }
        });
    }

    signUp(data: SignUpRequest): Promise<SignUpResponse> {
        return this.http.post('/signup', { body: data }).then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve(xhr.response);
                case 400:
                case 401:
                case 500:
                default:
                    console.log('AuthApi.signUp error', xhr.response);
                    return Promise.reject(xhr.response);
            }
        });
    }

    logout(): Promise<void> {
        return this.http.post('/logout').then((xhr) => {
            switch (xhr.status) {
                case 200:
                    return Promise.resolve();
                default:
                    return Promise.reject(xhr.response);
            }
        });
    }
}
