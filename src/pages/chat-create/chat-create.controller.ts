import { ChatsApi } from '../../core/api/services/chats.api';
import { AppStorage } from '../../core/storage/storage';
import { User } from '../../core/api/types/user';

export class ChatCreateController {
    private readonly chatsApi = new ChatsApi();

    createChat(title: string): Promise<void> {
        return this.chatsApi.create({ title }).then((created) => {
            const usersToAdd = AppStorage.query<User[]>('chat.creation.users');
            if (usersToAdd && usersToAdd.length > 0) {
                return this.chatsApi
                    .addUsers({
                        chatId: created.id,
                        users: usersToAdd.map((u) => u.id)
                    })
                    .then(() => {
                        AppStorage.store('chat.creation.users', []);
                        return Promise.resolve();
                    });
            }
            return Promise.resolve();
        });
    }
}
