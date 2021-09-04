class Storage {
    readonly storage: Record<string, unknown> = {};

    store(path: string, value: unknown): void {
        this.deepStore(path, value);
    }

    private deepStore(path: string, value: unknown) {
        let result: Record<string, unknown> = this.storage;
        const keys = path.split('.');
        keys.forEach((key, i) => {
            if (i === keys.length - 1) {
                return;
            }
            const dive = result[key];
            if (dive) {
                result = dive as never;
            } else {
                result[key] = {};
                result = result[key] as never;
            }
        });

        result[keys[keys.length - 1]] = value;
    }

    query<ExpectedValue>(path: string): ExpectedValue | null {
        return this.deepQuery<ExpectedValue>(path);
    }

    private deepQuery<T>(path: string): T | null {
        let result: Record<string, unknown> = this.storage;
        const keys = path.split('.');
        keys.forEach((key, i) => {
            if (i === keys.length - 1) {
                return;
            }
            result = result[key] as never;
        });

        return (result[keys[keys.length - 1]] as T) || null;
    }
}

export const AppStorage = new Storage();
