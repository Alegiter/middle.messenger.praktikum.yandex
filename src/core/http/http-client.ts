import HttpMethod from './http-method';
import { ApiResponseError } from '../utils/errors/api-response-error';

export type HttpRequestOptions = {
    body?: unknown;
    headers?: Record<string, string>;
    timeout?: number;
};

export default class HttpClient {
    constructor(private readonly baseUrl?: string) {}

    request<T>(
        method: HttpMethod,
        url: string,
        options: HttpRequestOptions = {}
    ): Promise<T> {
        const { body = {}, headers = {}, timeout = 5000 } = options;

        if (this.baseUrl) {
            // eslint-disable-next-line no-param-reassign
            url = this.baseUrl + url;
        }

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
                switch (xhr.status) {
                    case 200:
                        return resolve(xhr.response);
                    default:
                        return reject(new ApiResponseError(xhr));
                }
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

    get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.GET, url, options);
    }

    post<T>(url: string, options?: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.POST, url, options);
    }

    delete<T>(url: string, options?: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.DELETE, url, options);
    }

    put<T>(url: string, options?: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.PUT, url, options);
    }

    patch<T>(url: string, options?: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.PATCH, url, options);
    }
}
