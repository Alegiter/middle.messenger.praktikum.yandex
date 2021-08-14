/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpMethod from './http-method';

export type HttpRequestOptions = {
    body?: unknown;
    headers?: Record<string, string>;
    timeout?: number;
    observe?: 'xhr' | 'body';
};

export default class HttpClient {
    constructor(private readonly baseUrl: string) {}

    request<T>(
        method: HttpMethod,
        url: string,
        options?: HttpRequestOptions & { observe: 'body' }
    ): Promise<T>;

    request(
        method: HttpMethod,
        url: string,
        options?: HttpRequestOptions & { observe: 'xhr' }
    ): Promise<XMLHttpRequest>;

    request(
        method: HttpMethod,
        url: string,
        options: HttpRequestOptions = {}
    ): Promise<any> {
        const { body = {}, headers = {}, timeout = 5000, observe = 'body' } = options;

        // eslint-disable-next-line no-param-reassign
        url = this.baseUrl + url;

        return new Promise((resolve, reject) => {
            console.log('HttpClient Making request');
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.timeout = timeout;
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            Object.entries(headers).forEach((entry) =>
                xhr.setRequestHeader(entry[0], entry[1])
            );

            xhr.onload = () => {
                switch (observe) {
                    case 'body': {
                        resolve(xhr.response);
                        break;
                    }
                    case 'xhr': {
                        resolve(xhr);
                        break;
                    }
                    default:
                        throw new Error(
                            `Unreachable: unhandled observe type ${options.observe}}`
                        );
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === HttpMethod.GET || !body) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(body));
            }
        });
    }

    get<T>(url: string, options?: HttpRequestOptions & { observe: 'body' }): Promise<T>;

    get(
        url: string,
        options?: HttpRequestOptions & { observe: 'xhr' }
    ): Promise<XMLHttpRequest>;

    get(url: string, options?: HttpRequestOptions): Promise<any> {
        return this.request<any>(HttpMethod.GET, url, options as any);
    }

    post<T>(url: string, options?: HttpRequestOptions & { observe: 'body' }): Promise<T>;

    post(
        url: string,
        options?: HttpRequestOptions & { observe: 'xhr' }
    ): Promise<XMLHttpRequest>;

    post(url: string, options?: HttpRequestOptions): Promise<any> {
        return this.request<any>(HttpMethod.POST, url, options as any);
    }

    delete<T>(
        url: string,
        options?: HttpRequestOptions & { observe: 'body' }
    ): Promise<T>;

    delete(
        url: string,
        options?: HttpRequestOptions & { observe: 'xhr' }
    ): Promise<XMLHttpRequest>;

    delete(url: string, options?: HttpRequestOptions): Promise<any> {
        return this.request<any>(HttpMethod.DELETE, url, options as any);
    }

    put<T>(url: string, options?: HttpRequestOptions & { observe: 'body' }): Promise<T>;

    put(
        url: string,
        options?: HttpRequestOptions & { observe: 'xhr' }
    ): Promise<XMLHttpRequest>;

    put(url: string, options?: HttpRequestOptions): Promise<any> {
        return this.request<any>(HttpMethod.PUT, url, options as any);
    }

    patch<T>(url: string, options?: HttpRequestOptions & { observe: 'body' }): Promise<T>;

    patch(
        url: string,
        options?: HttpRequestOptions & { observe: 'xhr' }
    ): Promise<XMLHttpRequest>;

    patch(url: string, options?: HttpRequestOptions): Promise<any> {
        return this.request<any>(HttpMethod.PATCH, url, options as any);
    }
}
