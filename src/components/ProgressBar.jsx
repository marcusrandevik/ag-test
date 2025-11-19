import React from 'react';

const ProgressBar = ({ answerHistory, availableQuestionsCount }) => {
    // Calculate stats from history
    const correctCount = answerHistory.filter(a => a === 'correct').length;
    const incorrectCount = answerHistory.filter(a => a === 'incorrect').length;
    const remainingCount = availableQuestionsCount - answerHistory.length;

    // Calculate percentage for each answer
    const segmentPercentage = 100 / availableQuestionsCount;

    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                {/* Render each answer chronologically */}
                {answerHistory.map((result, index) => (
                    <div
                        key={index}
                        className={`progress-segment ${result}`}
                        style={{ width: `${segmentPercentage}%` }}
                        title={result === 'correct' ? 'Correct' : 'Incorrect'}
                    />
                ))}
                {/* Render remaining questions */}
                {remainingCount > 0 && (
                    <div
                        className="progress-segment remaining"
                        style={{ width: `${segmentPercentage * remainingCount}%` }}
                        title={`Remaining: ${remainingCount}`}
                    />
                )}
            </div>
            <div className="progress-stats">
                <span className="stat-correct">{correctCount} ✓</span>
                <span className="stat-incorrect">{incorrectCount} ✗</span>
                <span className="stat-remaining">{remainingCount} remaining</span>
            </div>
        </div>
    );
};

export default ProgressBar;
