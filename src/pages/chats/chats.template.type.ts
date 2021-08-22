import { SafeAny } from '../../core/utils/types';
import { ChatList } from './components/chat-list/chat-list';

export type ChatsTemplate = {
    // todo [sitnik] заменить на компонент чата, когда появится
    messenger?: SafeAny;
    chatList: ChatList;
};
