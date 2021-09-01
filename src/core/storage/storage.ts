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
                result = dive as any;
            } else {
                result[key] = {};
                result = result[key] as any;
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
            result = result[key] as any;
        });

        return (result[keys[keys.length - 1]] as T) || null;
    }
}

export const AppStorage = new Storage();

const test = new Storage();
test.store('a.b', 'a.b');
test.store('q.w.e', 'q.w.e');
console.log(test.storage);
console.log(test.query('q.w.e'));
console.log(test.query('abr'));
