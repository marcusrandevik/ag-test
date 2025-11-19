import React, { useState } from 'react';
import SelectionScreen from './components/SelectionScreen';
import GameScreen from './components/GameScreen';
import GameResults from './components/GameResults';
import HistoryScreen from './components/HistoryScreen'; // New import
import LanguageSwitcher from './components/LanguageSwitcher'; // New import
import storageService from './services/StorageService';
import './App.css';
import i18n from './i18n/i18n';

function App() {
  const [gameState, setGameState] = useState('selection'); // 'selection', 'playing', 'results', 'history'
  const [selectedTables, setSelectedTables] = useState([]);
  const [gameResults, setGameResults] = useState(null);

  const handleToggleTable = (num) => {
    setSelectedTables(prev =>
      prev.includes(num)
        ? prev.filter(n => n !== num)
        : [...prev, num].sort((a, b) => a - b)
    );
  };

  const handleStartGame = () => {
    if (selectedTables.length > 0) {
      setGameState('playing');
      setGameResults(null);
    }
  };

  const handleGameComplete = (results) => {
    setGameResults(results);
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setGameResults(null);
    setGameState('playing'); // Changed from 'selection' to 'playing' to match original logic
  };

  const handleBackToMenu = () => {
    setGameState('selection');
    setGameResults(null);
  };

  const handleViewHistory = () => {
    setGameState('history');
  };

  return (
    <div className="app-container">
      <LanguageSwitcher />

      {gameState === 'selection' && (
        <SelectionScreen
          selectedTables={selectedTables}
          onToggleTable={handleToggleTable}
          onStartGame={handleStartGame}
          onViewHistory={handleViewHistory}
        />
      )}
      {gameState === 'playing' && (
        <GameScreen
          selectedTables={selectedTables}
          onEndGame={handleBackToMenu}
          onGameComplete={handleGameComplete}
        />
      )}
      {gameState === 'results' && gameResults && (
        <GameResults
          results={gameResults}
          onPlayAgain={handlePlayAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}
      {gameState === 'history' && (
        <HistoryScreen onBack={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;
