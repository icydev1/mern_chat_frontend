export const localStorageData = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        const stored = localStorage.getItem(key);
        return stored == null ? undefined : JSON.parse(stored);
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};