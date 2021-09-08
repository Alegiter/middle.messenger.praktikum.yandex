import { UserApi } from '../../../core/api/services/user.api';
import { UserUpdateRequest } from '../../../core/api/types/user-update-request';
import { User } from '../../../core/api/types/user';
import { ProfileController } from '../profile.controller';

export class ProfileEditController {
    private readonly userApi = new UserApi();
    private readonly profileController = new ProfileController();

    getUser(): Promise<User> {
        return this.profileController.getUser();
    }

    update(data: UserUpdateRequest): Promise<void> {
        return this.userApi.update(data).then((user: User) => {
            // todo [sitnik] update in store mb
            void user;
            return Promise.resolve();
        });
    }

    updateAvatarFromInput(input: HTMLInputElement): Promise<User> {
        return this.profileController.updateAvatarFromInput(input);
    }
}
