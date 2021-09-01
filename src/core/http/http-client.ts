/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpMethod from './http-method';

export type HttpRequestOptions = {
    body?: unknown;
    headers?: Record<string, string>;
    timeout?: number;
};

export default class HttpClient {
    constructor(private readonly baseUrl: string) {}

    request(
        method: HttpMethod,
        url: string,
        options: HttpRequestOptions = {}
    ): Promise<XMLHttpRequest> {
        const { body = {}, headers = {}, timeout = 5000 } = options;

        // eslint-disable-next-line no-param-reassign
        url = this.baseUrl + url;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.timeout = timeout;
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            Object.entries(headers).forEach((entry) => {
                xhr.setRequestHeader(entry[0], entry[1]);
            });
            xhr.setRequestHeader('Accept', 'application/json');

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === HttpMethod.GET) {
                if (body) {
                    // todo [sitnik] добавить queryParams
                }
                xhr.send();
            } else if (body instanceof FormData) {
                xhr.send(body);
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(body ? JSON.stringify(body) : null);
            }
        });
    }

    get(url: string, options?: HttpRequestOptions): Promise<XMLHttpRequest> {
        return this.request(HttpMethod.GET, url, options);
    }

    post(url: string, options?: HttpRequestOptions): Promise<XMLHttpRequest> {
        return this.request(HttpMethod.POST, url, options);
    }

    delete(url: string, options?: HttpRequestOptions): Promise<XMLHttpRequest> {
        return this.request(HttpMethod.DELETE, url, options);
    }

    put(url: string, options?: HttpRequestOptions): Promise<XMLHttpRequest> {
        return this.request(HttpMethod.PUT, url, options);
    }

    patch(url: string, options?: HttpRequestOptions): Promise<XMLHttpRequest> {
        return this.request(HttpMethod.PATCH, url, options);
    }
}
