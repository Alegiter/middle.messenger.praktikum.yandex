import { User } from './user';

export type UserUpdateRequest = Pick<User, 'login'>;
