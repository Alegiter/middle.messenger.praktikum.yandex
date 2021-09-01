import Component, {
    ComponentChild,
    ComponentProperties
} from '../../../../core/components/component';
import { ChatSocket, ChatSocketData } from '../../../../core/api/web-socket/chat-socket';
import { Sender } from './sender/sender';
import { MessengerSettings } from './setting/setting';
import { Chat } from '../../../../core/api/types/chat';

type MessengerProperties = ComponentProperties & {
    setting: MessengerSettings;
    sender: Sender;
};

export class Messenger extends Component<MessengerProperties> {
    private chatSocket: ChatSocket;
    constructor(options: { chat: Chat; userId: number; chatToken: string }) {
        super('div', {
            setting: new MessengerSettings({
                chat: options.chat
            }),
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
            onMessage: this.renderSocketMessage
        });
    }

    onRender(): ComponentChild[] {
        const { setting, sender } = this.properties;
        return [setting.element, sender.element];
    }

    private renderSocketMessage(data: ChatSocketData): void {
        console.log('message receive', data);
    }

    private sendMessage(message: string): void {
        this.chatSocket.sendMessage(message);
    }
}
