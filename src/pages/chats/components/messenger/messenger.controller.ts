import { AuthApi } from '../../../../core/api/services/auth.api';
import { ChatsApi } from '../../../../core/api/services/chats.api';
import { Message } from './message-list/message/message';
import { ChatSocketMessageData } from '../../../../core/api/web-socket/types';

export class MessengerController {
    private readonly authApi = new AuthApi();
    private readonly chatsApi = new ChatsApi();

    createMessage(options: {
        userId: number;
        chatId: number;
        messageData: ChatSocketMessageData;
    }): Promise<Message> {
        const author$ =
            options.messageData.user_id === options.userId
                ? this.authApi.getUser()
                : this.chatsApi.users({ id: options.chatId }).then((users) =>
                      Promise.resolve(
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          users.find((u) => u.id === options.messageData.user_id)!
                      )
                  );

        return author$.then((user) => {
            const parsedTime = new Date(options.messageData.time).toLocaleString();
            return Promise.resolve(
                new Message({
                    side:
                        options.messageData.user_id === options.userId ? 'right' : 'left',
                    message: {
                        time: parsedTime,
                        text: options.messageData.content,
                        author: user
                    }
                })
            );
        });
    }
}
