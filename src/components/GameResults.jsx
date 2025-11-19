import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import ProgressChart from './ProgressChart';
import i18n from '../i18n/i18n';

const GameResults = ({
    correctGuesses,
    totalGuesses,
    timeSeconds,
    selectedTables,
    history,
    onPlayAgain,
    onBackToMenu
}) => {
    const accuracy = Math.round((correctGuesses / totalGuesses) * 100);
    const shareCardRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const getTimeFeedback = () => {
        if (timeSeconds < 60) return i18n.t('results.timeFeedback.fast');
        if (timeSeconds < 120) return i18n.t('results.timeFeedback.good');
        return i18n.t('results.timeFeedback.slow');
    };

    const handleShare = async () => {
        if (!shareCardRef.current) return;

        setIsGenerating(true);

        try {
            // Generate image from the share card
            const dataUrl = await toPng(shareCardRef.current, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: '#F7F9F9',
            });

            // Create download link
            const link = document.createElement('a');
            link.download = `multiplication-game-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();

            // Try to use Web Share API if available (for mobile)
            if (navigator.share && navigator.canShare) {
                try {
                    const blob = await (await fetch(dataUrl)).blob();
                    const file = new File([blob], 'multiplication-game-result.png', { type: 'image/png' });

                    if (navigator.canShare({ files: [file] })) {
                        await navigator.share({
                            files: [file],
                            title: 'My Multiplication Game Score',
                            text: `I scored ${correctGuesses}/${totalGuesses} (${accuracy}%) in ${timeSeconds}s!`,
                        });
                    }
                } catch (shareError) {
                    // Share API failed, but download already happened
                    console.log('Share API not available, image downloaded instead');
                }
            }
        } catch (error) {
            console.error('Failed to generate image:', error);
            alert('Failed to generate share image. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="game-results">
            {/* Share Card - This is what gets converted to an image */}
            <div ref={shareCardRef} className="share-card">
                <div className="share-header">
                    <h2>{i18n.t('results.title')}</h2>
                </div>

                <div className="results-summary">
                    <div className="result-card">
                        <div className="result-label">{i18n.t('results.scoreLabel')}</div>
                        <div className="result-value">{i18n.t('results.scoreFormat', { correct: correctGuesses, total: totalGuesses })}</div>
                        <div className="result-subtitle">{i18n.t('results.accuracyFormat', { accuracy })}</div>
                    </div>

                    <div className="result-card">
                        <div className="result-label">{i18n.t('results.timeLabel')}</div>
                        <div className="result-value">{i18n.t('results.timeValue', { time: timeSeconds })}</div>
                        <div className="result-subtitle">{getTimeFeedback()}</div>
                    </div>

                    <div className="result-card">
                        <div className="result-label">{i18n.t('results.tablesLabel')}</div>
                        <div className="result-value tables-list">{selectedTables.join(', ')}</div>
                        <div className="result-subtitle">
                            {selectedTables.length === 1
                                ? i18n.t('results.tablesCount', { count: selectedTables.length })
                                : i18n.t('results.tablesCountPlural', { count: selectedTables.length })
                            }
                        </div>
                    </div>

                    <div className="result-card">
                        <div className="result-label">{i18n.t('results.avgTimeLabel')}</div>
                        <div className="result-value">{(timeSeconds / totalGuesses).toFixed(1)}s</div>
                        <div className="result-subtitle">{i18n.t('results.avgTimeSubtitle')}</div>
                    </div>
                </div>
            </div>

            <ProgressChart history={history} />

            <div className="results-actions">
                <button
                    className="share-btn"
                    onClick={handleShare}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <span className="spinner"></span>
                            Generating...
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                            Share Results
                        </>
                    )}
                </button>
                <button className="play-again-btn" onClick={onPlayAgain}>
                    {i18n.t('results.playAgain')}
                </button>
                <button className="back-menu-btn" onClick={onBackToMenu}>
                    {i18n.t('results.backToMenu')}
                </button>
            </div>
        </div>
    );
};

export default GameResults;
