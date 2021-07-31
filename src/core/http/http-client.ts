import { HttpMethod } from './http-method';

export type HttpRequestOptions = {
    method?: HttpMethod;
    data?: unknown;
    headers?: Record<string, string>;
    timeout?: number;
};

export default class HttpClient {
    get<T>(url: string, options: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.GET, url, options, options.timeout);
    }

    post<T>(url: string, options: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.POST, url, options, options.timeout);
    }

    delete<T>(url: string, options: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.DELETE, url, options, options.timeout);
    }

    put<T>(url: string, options: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.PUT, url, options, options.timeout);
    }

    patch<T>(url: string, options: HttpRequestOptions): Promise<T> {
        return this.request<T>(HttpMethod.PATCH, url, options, options.timeout);
    }

    request<T>(
        method: HttpMethod,
        url: string,
        options: HttpRequestOptions,
        timeout = 5000
    ): Promise<T> {
        const { data = {}, headers = {} } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.timeout = timeout;

            Object.entries(headers).forEach((entry) =>
                xhr.setRequestHeader(entry[0], entry[1])
            );

            xhr.onload = () => {
                resolve(xhr.response as T);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === HttpMethod.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
