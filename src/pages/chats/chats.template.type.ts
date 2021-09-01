import { ChatList } from './components/chat-list/chat-list';
import { Messenger } from './components/messenger/messenger';

export type ChatsTemplate = {
    // todo [sitnik] заменить на компонент чата, когда появится
    messenger?: Messenger;
    chatList: ChatList;
};
