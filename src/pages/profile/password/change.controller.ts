import { UserApi } from '../../../core/api/services/user.api';
import { ValidationError } from '../../../core/utils/errors/validation-error';
import { ApiResponseError } from '../../../core/utils/errors/api-response-error';

export type UserUpdatePasswordData = {
    oldPassword: string;
    newPassword: string;
    newPasswordAgain: string;
};

export class ProfilePasswordChangeController {
    private readonly userApi = new UserApi();

    changePassword(data: UserUpdatePasswordData): Promise<void> {
        if (this.validateNewPassword(data.newPassword, data.newPasswordAgain)) {
            const { oldPassword, newPassword } = data;
            return this.userApi
                .updatePassword({ oldPassword, newPassword })
                .catch((err: ApiResponseError) => {
                    if (err.reason === 'Password is incorrect') {
                        return Promise.reject(
                            new ValidationError('oldPassword', 'Пароль неверный')
                        );
                    }
                    return Promise.reject();
                });
        }

        return Promise.reject(
            new ValidationError('newPasswordAgain', 'Пароли не совпадают')
        );
    }

    private validateNewPassword(password: string, passwordAgain: string): boolean {
        return password === passwordAgain;
    }
}
