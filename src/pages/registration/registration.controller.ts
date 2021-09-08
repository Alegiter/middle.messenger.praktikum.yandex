import { AuthApi } from '../../core/api/services/auth.api';
import { SignUpRequest } from '../../core/api/types/sign-up-request';

export class RegistrationController {
    private readonly authApi = new AuthApi();

    signUp(data: SignUpRequest): Promise<boolean> {
        return this.authApi.signUp(data).then((created) => {
            if (created.id > 0) {
                return Promise.resolve(true);
            }
            return Promise.reject();
        });
    }
}
