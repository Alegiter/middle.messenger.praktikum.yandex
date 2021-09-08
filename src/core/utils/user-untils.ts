import { User } from '../api/types/user';
import { apiResourcesUrl } from './constants';

export function initialsFromUser(user: User): string {
    return `${user.first_name.substr(0, 1).toUpperCase()}${user.second_name
        .substr(0, 1)
        .toUpperCase()}`;
}

export function avatarHrefFromUser(user: User): string | undefined {
    return user.avatar ? `${apiResourcesUrl}/${user.avatar}` : undefined;
}
