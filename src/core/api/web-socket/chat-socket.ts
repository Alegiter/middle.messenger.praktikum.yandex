export interface ChatSocketData {
    type: 'message' | 'user connected' | 'ping' | 'pong';
}

export interface ChatSocketDataWithContent extends ChatSocketData {
    content: string;
}

export interface ChatSocketMessageData extends ChatSocketDataWithContent {
    type: 'message';
    time: string;
    userId: number;
}

export type ChatSocketOptions = {
    userId: number;
    chat: {
        id: number;
        token: string;
    };
    onMessage: (message: ChatSocketData) => void;
};

/**
 * Уважаемый ревьюер, мой куратор сказала сдать на проверку, чтобы вы смогли прояснить ситуацию
 *
 * Дело в том, что при попытке создать ws подключение тут же прилетает 'WS token is not valid'
 *
 * Я попробовал ещё следующее:
 * Через swagger авторизировался, получил токен на чат
 * Локально создал тестовую html'ку, захаркодил там подключение по ws на данные из swagger и он подключился успешно
 *
 * В приложении этот сценарий не работает
 *
 * Помогите разобраться, уже пару дней не двигаемся с этого места
 */

export class ChatSocket {
    private socket: WebSocket;
    constructor(options: ChatSocketOptions) {
        console.log('ChatSocket');
        this.socket = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${options.userId}/${options.chat.id}/${options.chat.token}`
        );

        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            console.time('ping');
            this.ping();
        });

        this.socket.addEventListener('close', (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this.socket.addEventListener('message', (event: MessageEvent<ChatSocketData>) => {
            console.log('Получены данные', event.data);
            if (event.data.type === 'pong') {
                console.timeEnd('ping');
                return;
            }
            options.onMessage(event.data);
        });

        this.socket.addEventListener('error', (event) => {
            console.log('Ошибка', event);
        });
    }

    sendMessage(message: string): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({
                    content: message,
                    type: 'message'
                })
            );
        }
    }

    ping(): void {
        this.socket.send(JSON.stringify({ type: 'ping' }));
    }
}
