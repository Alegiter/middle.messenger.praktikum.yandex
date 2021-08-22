import { User } from './user';
import { DateISOString } from '../../utils/types';

export type Chat = {
    id: number;
    title: string;
    avatar?: string;
    unread_count: number;
    last_message?: {
        user: User;
        time: DateISOString;
        content: string;
    };
};
