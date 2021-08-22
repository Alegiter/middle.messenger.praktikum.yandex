import { User } from '../api/types/user';

export function initialsFromUser(user: User): string {
    return `${user.first_name.substr(0, 1).toUpperCase()}${user.second_name
        .substr(0, 1)
        .toUpperCase()}`;
}
