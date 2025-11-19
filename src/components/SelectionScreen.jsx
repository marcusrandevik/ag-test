import React from 'react';
import i18n from '../i18n/i18n';
import LanguageSwitcher from './LanguageSwitcher';

const SelectionScreen = ({ selectedTables, toggleTable, onStartGame }) => {
  const tables = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="selection-screen">
      <LanguageSwitcher />
      <h1>{i18n.t('selection.title')}</h1>
      <p>{i18n.t('selection.subtitle')}</p>
      <div className="tables-grid">
        {tables.map((num) => (
          <button
            key={num}
            className={`table-btn ${selectedTables.includes(num) ? 'selected' : ''}`}
            onClick={() => toggleTable(num)}
          >
            {num}x
          </button>
        ))}
      </div>
      <button
        className="start-btn"
        onClick={onStartGame}
        disabled={selectedTables.length === 0}
      >
        {i18n.t('selection.startButton')}
      </button>
    </div>
  );
};

export default SelectionScreen;
