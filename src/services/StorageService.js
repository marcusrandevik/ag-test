import LocalStorageAdapter from './LocalStorageAdapter';

/**
 * Generic storage service for game history
 * Can be configured with different storage adapters (localStorage, IndexedDB, API, etc.)
 */
class StorageService {
    constructor(adapter = null) {
        this.adapter = adapter || new LocalStorageAdapter();
    }

    /**
     * Generate a unique key for a combination of tables
     * @param {Array<number>} tables - Array of table numbers
     * @returns {string} - Sorted, comma-separated string (e.g., "1,2,5")
     */
    generateTableKey(tables) {
        return [...tables].sort((a, b) => a - b).join(',');
    }

    /**
     * Save a game result
     * @param {Array<number>} tables - Selected multiplication tables
     * @param {Object} result - Game result { correctGuesses, totalGuesses, timeSeconds }
     */
    saveGameResult(tables, result) {
        const tableKey = this.generateTableKey(tables);
        const data = this.adapter.getData();

        if (!data[tableKey]) {
            data[tableKey] = [];
        }

        const gameRecord = {
            timestamp: new Date().toISOString(),
            correctGuesses: result.correctGuesses,
            totalGuesses: result.totalGuesses,
            timeSeconds: result.timeSeconds,
            accuracy: Math.round((result.correctGuesses / result.totalGuesses) * 100)
        };

        data[tableKey].push(gameRecord);

        // Keep only last 20 attempts per combination to avoid storage bloat
        if (data[tableKey].length > 20) {
            data[tableKey] = data[tableKey].slice(-20);
        }

        return this.adapter.saveData(data);
    }

    /**
     * Get game history for a specific table combination
     * @param {Array<number>} tables - Selected multiplication tables
     * @returns {Array} - Array of game records
     */
    getGameHistory(tables) {
        const tableKey = this.generateTableKey(tables);
        const data = this.adapter.getData();
        return data[tableKey] || [];
    }

    /**
     * Get all game history
     * @returns {Object} - All stored game data
     */
    getAllHistory() {
        return this.adapter.getData();
    }

    /**
     * Clear all game history
     */
    clearHistory() {
        return this.adapter.clearData();
    }

    /**
     * Clear history for a specific table combination
     * @param {Array<number>} tables - Selected multiplication tables
     */
    clearTableHistory(tables) {
        const tableKey = this.generateTableKey(tables);
        const data = this.adapter.getData();
        delete data[tableKey];
        return this.adapter.saveData(data);
    }
}

// Export a singleton instance
const storageService = new StorageService();
export default storageService;
