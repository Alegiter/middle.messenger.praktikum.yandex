import HttpClient from '../../http/http-client';
import { User } from '../types/user';
import { SignInRequest } from '../types/sign-in-request';
import { SignUpRequest } from '../types/sign-up-request';
import { SignUpResponse } from '../types/sign-up-response';
import { apiUrl } from '../../utils/constants';

export class AuthApi {
    private readonly http = new HttpClient(`${apiUrl}/auth`);

    getUser(): Promise<User> {
        return this.http.get('/user');
    }

    signIn(data: SignInRequest): Promise<void> {
        return this.http.post<void>('/signin', { body: data });
    }

    signUp(data: SignUpRequest): Promise<SignUpResponse> {
        return this.http.post('/signup', { body: data });
    }

    logout(): Promise<void> {
        return this.http.post('/logout');
    }
}
