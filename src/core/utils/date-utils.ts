function today(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}

export function getTodayRelativelyDateStringFromISOString(isoString: string): string {
    try {
        const date = new Date(isoString);

        if (date.getTime() < today().getTime()) {
            return date.toLocaleDateString();
        }

        return date.toLocaleTimeString();
    } catch (e) {
        return isoString;
    }
}
