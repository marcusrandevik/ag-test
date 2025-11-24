import React, { useState, useEffect } from 'react';
import storageService from '../services/StorageService';
import ProgressChart from './ProgressChart';
import Grid from './Grid';
import i18n from '../i18n/i18n';

const HistoryScreen = ({ onBack }) => {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [availableTableCombos, setAvailableTableCombos] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        const allData = storageService.getAllHistory();
        let allGames = [];
        const tableCombos = new Set();

        Object.keys(allData).forEach(key => {
            const tables = key.split(',').map(Number);
            const games = allData[key].map(game => ({
                ...game,
                selectedTables: tables,
                tableKey: key
            }));
            allGames = [...allGames, ...games];
            tableCombos.add(key);
        });

        // Sort by date descending (newest first)
        const sortedHistory = allGames.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setHistory(sortedHistory);
        setFilteredHistory(sortedHistory);
        setAvailableTableCombos(Array.from(tableCombos));
    }, []);

    useEffect(() => {
        if (selectedFilter === 'all') {
            setFilteredHistory(history);
        } else {
            setFilteredHistory(history.filter(game => game.tableKey === selectedFilter));
        }
    }, [selectedFilter, history]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatTables = (tables) => {
        return tables.map(t => `${t}x`).join(', ');
    };

    const openDetails = (game) => {
        setSelectedGame(game);
    };

    const closeDetails = () => {
        setSelectedGame(null);
    };

    return (
        <div className="history-screen">
            <div className="history-header">
                <button className="back-btn" onClick={onBack}>
                    {i18n.t('game.back')}
                </button>
                <h2>{i18n.t('history.title', 'History')}</h2>
                <div style={{ width: '60px' }}></div> {/* Spacer for centering */}
            </div>

            {availableTableCombos.length > 0 && (
                <div className="history-filter">
                    <span className="filter-label">{i18n.t('history.filterLabel', 'Filter by tables')}:</span>
                    <div className="filter-pills">
                        <button
                            className={`filter-pill ${selectedFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedFilter('all')}
                        >
                            {i18n.t('history.allTables', 'All tables')}
                        </button>
                        {availableTableCombos.map(combo => (
                            <button
                                key={combo}
                                className={`filter-pill ${selectedFilter === combo ? 'active' : ''}`}
                                onClick={() => setSelectedFilter(combo)}
                            >
                                {formatTables(combo.split(',').map(Number))}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {filteredHistory.length === 0 ? (
                <div className="no-history">
                    <p>{selectedFilter === 'all'
                        ? i18n.t('history.noData', 'No games played yet.')
                        : i18n.t('history.noDataForFilter', 'No games found for this filter.')
                    }</p>
                </div>
            ) : (
                <div className="history-list">
                    {filteredHistory.map((game, index) => (
                        <div key={index} className="history-card" onClick={() => openDetails(game)}>
                            <div className="history-tables">
                                <strong>{i18n.t('results.tables', 'Tables')}:</strong> {formatTables(game.selectedTables)}
                            </div>
                            <div className="history-stats">
                                <span>{game.correctGuesses}/{game.totalGuesses}</span>
                                <span>{game.timeSeconds.toFixed(2)}s</span>
                            </div>
                            <span className={`history-score ${game.accuracy >= 80 ? 'high' : game.accuracy >= 60 ? 'medium' : 'low'}`}>
                                {game.accuracy}%
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {selectedGame && (
                <div className="modal-overlay" onClick={closeDetails}>
                    <div className="modal-content modal-content-wide" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeDetails}>&times;</button>
                        <h3>{i18n.t('history.detailsTitle', 'Game Details')}</h3>

                        <div className="modal-body">
                            <div className="detail-row">
                                <span className="detail-label">{i18n.t('results.date', 'Date')}:</span>
                                <span className="detail-value">{formatDate(selectedGame.timestamp)}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">{i18n.t('results.tables', 'Tables')}:</span>
                                <span className="detail-value">{formatTables(selectedGame.selectedTables)}</span>
                            </div>

                            <div className="detail-stats-grid">
                                <div className="detail-stat">
                                    <span className="stat-label">{i18n.t('results.score', 'Score')}</span>
                                    <span className="stat-value">{selectedGame.accuracy}%</span>
                                </div>
                                <div className="detail-stat">
                                    <span className="stat-label">{i18n.t('results.correct', 'Correct')}</span>
                                    <span className="stat-value">{selectedGame.correctGuesses}/{selectedGame.totalGuesses}</span>
                                </div>
                                <div className="detail-stat">
                                    <span className="stat-label">{i18n.t('results.time', 'Time')}</span>
                                    <span className="stat-value">{selectedGame.timeSeconds.toFixed(2)}s</span>
                                </div>
                                <div className="detail-stat">
                                    <span className="stat-label">{i18n.t('results.avgTime', 'Avg Time')}</span>
                                    <span className="stat-value">{(selectedGame.timeSeconds / selectedGame.totalGuesses).toFixed(2)}s</span>
                                </div>
                            </div>

                            <div className="modal-chart">
                                <ProgressChart history={storageService.getGameHistory(selectedGame.selectedTables)} />
                            </div>

                            {console.log('selectedGame:', selectedGame)}
                            {console.log('boardHistory:', selectedGame.boardHistory)}

                            {selectedGame.boardHistory && (
                                <div className="modal-grid-history">
                                    <h4>{i18n.t('history.boardState', 'Board State')}</h4>
                                    <div className="grid-wrapper">
                                        <Grid
                                            gridState={selectedGame.boardHistory.reduce((acc, [row, col, status]) => {
                                                acc[`${row}-${col}`] = status;
                                                return acc;
                                            }, {})}
                                            selectedTables={selectedGame.selectedTables}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryScreen;
