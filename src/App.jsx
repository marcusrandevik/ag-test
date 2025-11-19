import React, { useState } from 'react';
import SelectionScreen from './components/SelectionScreen';
import GameScreen from './components/GameScreen';
import GameResults from './components/GameResults';
import storageService from './services/StorageService';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('selection'); // 'selection', 'playing', 'results'
  const [selectedTables, setSelectedTables] = useState([]);
  const [gameResults, setGameResults] = useState(null);

  const toggleTable = (num) => {
    setSelectedTables(prev =>
      prev.includes(num)
        ? prev.filter(n => n !== num)
        : [...prev, num].sort((a, b) => a - b)
    );
  };

  const startGame = () => {
    if (selectedTables.length > 0) {
      setGameState('playing');
      setGameResults(null);
    }
  };

  const handleGameComplete = (results) => {
    setGameResults(results);
    setGameState('results');
  };

  const playAgain = () => {
    setGameState('playing');
    setGameResults(null);
  };

  const backToMenu = () => {
    setGameState('selection');
    setGameResults(null);
  };

  return (
    <div className="app-container">
      {gameState === 'selection' && (
        <SelectionScreen
          selectedTables={selectedTables}
          toggleTable={toggleTable}
          onStartGame={startGame}
        />
      )}
      {gameState === 'playing' && (
        <GameScreen
          selectedTables={selectedTables}
          onEndGame={backToMenu}
          onGameComplete={handleGameComplete}
        />
      )}
      {gameState === 'results' && gameResults && (
        <GameResults
          correctGuesses={gameResults.correctGuesses}
          totalGuesses={gameResults.totalGuesses}
          timeSeconds={gameResults.timeSeconds}
          selectedTables={selectedTables}
          history={storageService.getGameHistory(selectedTables)}
          onPlayAgain={playAgain}
          onBackToMenu={backToMenu}
        />
      )}
    </div>
  );
}

export default App;
