export interface Type<T> extends Function {
    new (...args: unknown[]): T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any;

export type DateISOString = string;
