import React from 'react';
import i18n from '../i18n/i18n';
import LanguageSwitcher from './LanguageSwitcher';

const SelectionScreen = ({
  selectedTables,
  onToggleTable,
  onStartGame,
  onViewHistory,
  limitQuestions,
  questionLimit,
  onToggleLimitQuestions,
  onQuestionLimitChange
}) => {
  const tables = Array.from({ length: 10 }, (_, i) => i + 1);

  // Calculate total available questions
  const totalQuestions = selectedTables.length * 10;

  // Validate and handle question limit input
  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= totalQuestions) {
      onQuestionLimitChange(value);
    } else if (e.target.value === '') {
      onQuestionLimitChange(1);
    }
  };

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

      {/* Question Limit Controls */}
      {selectedTables.length > 0 && (
        <div className="question-limit-container">
          <label className="limit-checkbox-label">
            <input
              type="checkbox"
              checked={limitQuestions}
              onChange={onToggleLimitQuestions}
              className="limit-checkbox"
            />
            <span>{i18n.t('selection.limitQuestions')}</span>
          </label>

          {limitQuestions && (
            <div className="limit-input-group">
              <input
                type="number"
                min="1"
                max={totalQuestions}
                value={questionLimit}
                onChange={handleLimitChange}
                className="limit-input"
              />
              <span className="limit-text">
                {i18n.t('selection.outOf', { total: totalQuestions })}
              </span>
            </div>
          )}
        </div>
      )}

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
