import { User } from '../../api/types/user';
import Avatar from '../avatar/avatar';

export type SelectableUserTemplate = {
    user: User;
    avatar: Avatar;
};
