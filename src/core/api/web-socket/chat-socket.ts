import { ChatSocketData, ChatSocketDataWithContent, ChatSocketOptions } from './types';

export class ChatSocket {
    private socket!: WebSocket;
    constructor(options: ChatSocketOptions) {
        this.open(options);
    }

    private open(options: ChatSocketOptions): void {
        this.socket = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${options.userId}/${options.chat.id}/${options.chat.token}`
        );

        this.socket.addEventListener('open', () => {
            // console.log('Соединение установлено');

            this.requestOldMessages();
        });

        this.socket.addEventListener('close', (event) => {
            if (event.wasClean) {
                // console.log('Соединение закрыто чисто');
            } else {
                // console.log('Обрыв соединения');
            }

            // console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this.socket.addEventListener('message', (event: MessageEvent<string>) => {
            const data: ChatSocketData = JSON.parse(event.data);
            // console.log('Получены данные', data);
            options.onMessage(data);
        });

        this.socket.addEventListener('error', (event) => {
            // console.log('Ошибка', event);
            void event;
        });
    }

    sendMessage(message: string): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({
                    content: message,
                    type: 'message'
                } as ChatSocketDataWithContent)
            );
        }
    }

    ping(): void {
        this.socket.send(JSON.stringify({ type: 'ping' } as ChatSocketData));
    }

    requestOldMessages(offset = 0): void {
        this.socket.send(
            JSON.stringify({
                content: offset.toString(),
                type: 'get old'
            } as ChatSocketDataWithContent)
        );
    }
}
