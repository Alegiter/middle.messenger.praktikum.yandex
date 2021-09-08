import Component, {
    ComponentChild,
    ComponentProperties
} from '../../../../core/components/component';
import { Sender } from './sender/sender';
import { MessengerSettings } from './setting/setting';
import { Chat } from '../../../../core/api/types/chat';
import { MessageList } from './message-list/message-list';
import { MessengerController } from './messenger.controller';
import { ChatSocket } from '../../../../core/api/web-socket/chat-socket';
import {
    ChatSocketData,
    chatSocketDataIsMessage
} from '../../../../core/api/web-socket/types';
import { Message } from './message-list/message/message';

type MessengerProperties = ComponentProperties & {
    setting: MessengerSettings;
    messageList: MessageList;
    sender: Sender;
};

export class Messenger extends Component<MessengerProperties> {
    private chatSocket: ChatSocket;
    private controller = new MessengerController();

    constructor(private options: { chat: Chat; userId: number; chatToken: string }) {
        super('div', {
            setting: new MessengerSettings({
                chat: options.chat
            }),
            messageList: new MessageList(),
            sender: new Sender({
                onSend: (message) => this.sendMessage(message)
            })
        });

        this.chatSocket = new ChatSocket({
            chat: {
                id: options.chat.id,
                token: options.chatToken
            },
            userId: options.userId,
            onMessage: this.renderSocketMessage.bind(this)
        });
    }

    onRender(): ComponentChild[] {
        const { setting, messageList, sender } = this.properties;
        return [setting.element, messageList.element, sender.element];
    }

    private renderSocketMessage(data: ChatSocketData | ChatSocketData[]): void {
        const createMessage = (part: ChatSocketData): Promise<Message> => {
            if (chatSocketDataIsMessage(part)) {
                return this.controller.createMessage({
                    userId: this.options.userId,
                    chatId: this.options.chat.id,
                    messageData: part
                });
            }
            return Promise.reject();
        };
        const { messageList } = this.properties;

        if (Array.isArray(data)) {
            Promise.allSettled(
                [...data.reverse()].map((part) => createMessage(part))
            ).then((messagesResult: PromiseSettledResult<Message>[]) => {
                messagesResult.forEach((messageResult) => {
                    if (messageResult.status === 'fulfilled') {
                        messageList.addMessage(messageResult.value);
                    }
                });
            });
        } else {
            createMessage(data).then((message) => {
                messageList.addMessage(message);
            });
        }
    }

    private sendMessage(message: string): void {
        this.chatSocket.sendMessage(message);
    }
}
