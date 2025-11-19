import React from 'react';
import i18n from '../i18n/i18n';
import LanguageSwitcher from './LanguageSwitcher';

const SelectionScreen = ({ selectedTables, onToggleTable, onStartGame, onViewHistory }) => {
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
            onClick={() => onToggleTable(num)}
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
        {i18n.t('selection.start')}
      </button>

      <button
        className="history-btn"
        onClick={onViewHistory}
        style={{ marginTop: '20px', background: 'none', border: 'none', color: '#7f8c8d', textDecoration: 'underline', cursor: 'pointer', fontSize: '1rem' }}
      >
        {i18n.t('selection.viewHistory', 'View History')}
      </button>
    </div>
  );
};

export default SelectionScreen;
