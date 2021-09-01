import { AuthApi } from '../../core/api/services/auth.api';
import { SignInRequest } from '../../core/api/types/sign-in-request';

export class LoginController {
    private readonly authApi = new AuthApi();

    signIn(data: SignInRequest): Promise<boolean> {
        return this.authApi.signIn(data).then(() => Promise.resolve(true));
    }
}
