import { AuthApi } from '../../core/api/services/auth.api';
import { SignInRequest } from '../../core/api/types/sign-in-request';

export class LoginController {
    private readonly authApi = new AuthApi();

    isUserAuthorized(): Promise<boolean> {
        return this.authApi
            .getUser()
            .then((user) => {
                // todo [sitnik] куда-то сохранить юзера
                void user;
                return Promise.resolve(true);
            })
            .catch(() => Promise.resolve(false));
    }

    signIn(data: SignInRequest): Promise<boolean> {
        return this.authApi.signIn(data).then(() => Promise.resolve(true));
    }
}
