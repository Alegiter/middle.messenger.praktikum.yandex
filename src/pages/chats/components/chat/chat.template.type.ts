import Avatar from '../../../../core/components/avatar/avatar';
import { DateISOString } from '../../../../core/utils/types';

export type ChatTemplate = {
    avatar: Avatar;
    title: string;
    unread_count: number;
    last_message?: {
        time: DateISOString;
        content: string;
    };
    id: number;
    selected?: boolean;
};
