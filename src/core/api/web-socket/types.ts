export interface ChatSocketData {
    type: 'message' | 'user connected' | 'ping' | 'pong' | 'get old';
}

export interface ChatSocketDataWithContent extends ChatSocketData {
    content: string;
}

export interface ChatSocketMessageData extends ChatSocketDataWithContent {
    type: 'message';
    time: string;
    user_id: number;
}

export function chatSocketDataIsMessage(
    data: ChatSocketData
): data is ChatSocketMessageData {
    return data.type === 'message';
}

export type ChatSocketOptions = {
    userId: number;
    chat: {
        id: number;
        token: string;
    };
    onMessage: (message: ChatSocketData | ChatSocketData[]) => void;
};
