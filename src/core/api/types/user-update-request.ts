import { User } from './user';

export type UserUpdateRequest = Omit<User, 'id' | 'avatar'>;
