/**
 * LocalStorage implementation of the storage adapter
 */
class LocalStorageAdapter {
    constructor() {
        this.storageKey = 'multiplication_game_history';
    }

    /**
     * Get all data from localStorage
     */
    getData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return {};
        }
    }

    /**
     * Save data to localStorage
     */
    saveData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    }

    /**
     * Clear all data
     */
    clearData() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
}

export default LocalStorageAdapter;
