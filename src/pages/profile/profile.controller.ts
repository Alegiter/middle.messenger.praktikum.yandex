import { AuthApi } from '../../core/api/services/auth.api';
import { UserApi } from '../../core/api/services/user.api';
import { User } from '../../core/api/types/user';
import { Router } from '../../core/utils/routing/router';
import { Routes } from '../../core/utils/routing/routes';

export class ProfileController {
    private readonly authApi = new AuthApi();
    private readonly userApi = new UserApi();

    getUser(): Promise<User> {
        return this.authApi.getUser();
    }

    logout(): void {
        this.authApi.logout().then(() => {
            Router.go(Routes.LOGIN);
        });
    }

    updateAvatarFromInput(input: HTMLInputElement): Promise<User> {
        if (input.files) {
            const file = input.files[0];
            const form = new FormData();
            form.append('avatar', file, 'avatar.png');
            return this.userApi.updateAvatar(form);
        }
        return Promise.reject(new Error('Файл не выбран'));
    }
}
