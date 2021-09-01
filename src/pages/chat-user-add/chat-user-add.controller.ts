import { UserApi } from '../../core/api/services/user.api';
import { User } from '../../core/api/types/user';

export class ChatUserAddController {
    private userApi = new UserApi();

    searchUserByLogin(login: string): Promise<User[]> {
        return this.userApi.getUsersByLogin(login).catch(() => {
            return [];
        });
    }
}
