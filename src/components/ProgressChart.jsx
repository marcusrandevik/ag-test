import React from 'react';
import i18n from '../i18n/i18n';

const ProgressChart = ({ history }) => {
    if (!history || history.length === 0) {
        return (
            <div className="progress-chart">
                <h3>{i18n.t('chart.title')}</h3>
                <p className="no-data">{i18n.t('chart.noData')}</p>
            </div>
        );
    }

    // Calculate chart dimensions - responsive for mobile
    const maxAccuracy = 100;
    const chartHeight = 200;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // On mobile, show only last 6 attempts to fit screen, but make scrollable
    const displayHistory = isMobile && history.length > 6
        ? history.slice(-6)
        : history;

    const barWidth = isMobile ? 45 : 40;
    const barSpacing = isMobile ? 55 : 60;
    const padding = { top: 20, right: 40, bottom: 40, left: 40 };
    const chartWidth = Math.max(300, displayHistory.length * barSpacing + padding.left + padding.right);
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    return (
        <div className="progress-chart">
            <h3>{i18n.t('chart.title')}</h3>
            <div className="chart-container">
                <svg width={chartWidth} height={chartHeight} className="chart-svg">
                    {/* Y-axis labels */}
                    <text x={padding.left - 10} y={padding.top} textAnchor="end" className="axis-label">100%</text>
                    <text x={padding.left - 10} y={padding.top + innerHeight / 2} textAnchor="end" className="axis-label">50%</text>
                    <text x={padding.left - 10} y={padding.top + innerHeight} textAnchor="end" className="axis-label">0%</text>

                    {/* Grid lines */}
                    <line
                        x1={padding.left}
                        y1={padding.top}
                        x2={padding.left + innerWidth}
                        y2={padding.top}
                        className="grid-line"
                    />
                    <line
                        x1={padding.left}
                        y1={padding.top + innerHeight / 2}
                        x2={padding.left + innerWidth}
                        y2={padding.top + innerHeight / 2}
                        className="grid-line"
                    />
                    <line
                        x1={padding.left}
                        y1={padding.top + innerHeight}
                        x2={padding.left + innerWidth}
                        y2={padding.top + innerHeight}
                        className="grid-line"
                    />

                    {/* Bars */}
                    {displayHistory.map((record, index) => {
                        const barHeight = (record.accuracy / maxAccuracy) * innerHeight;
                        const x = padding.left + index * barSpacing + (barSpacing - barWidth) / 2;
                        const y = padding.top + innerHeight - barHeight;

                        // Calculate the actual attempt number (for labeling)
                        const attemptNumber = isMobile && history.length > 6
                            ? history.length - 6 + index + 1
                            : index + 1;

                        return (
                            <g key={index}>
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    className="chart-bar"
                                    fill={record.accuracy >= 80 ? '#2ECC71' : record.accuracy >= 60 ? '#FFE66D' : '#FF6B6B'}
                                />
                                <text
                                    x={x + barWidth / 2}
                                    y={y - 5}
                                    textAnchor="middle"
                                    className="bar-label"
                                >
                                    {record.accuracy}%
                                </text>
                                <text
                                    x={x + barWidth / 2}
                                    y={padding.top + innerHeight + 15}
                                    textAnchor="middle"
                                    className="attempt-label"
                                >
                                    {i18n.t('chart.attemptLabel', { number: attemptNumber })}
                                </text>
                                <text
                                    x={x + barWidth / 2}
                                    y={padding.top + innerHeight + 30}
                                    textAnchor="middle"
                                    className="time-label"
                                >
                                    {record.timeSeconds}s
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
            <div className="chart-stats">
                <div className="stat">
                    <span className="stat-label">{i18n.t('chart.bestLabel')}</span>
                    <span className="stat-value">{Math.max(...history.map(h => h.accuracy))}%</span>
                </div>
                <div className="stat">
                    <span className="stat-label">{i18n.t('chart.averageLabel')}</span>
                    <span className="stat-value">
                        {Math.round(history.reduce((sum, h) => sum + h.accuracy, 0) / history.length)}%
                    </span>
                </div>
                <div className="stat">
                    <span className="stat-label">{i18n.t('chart.totalAttemptsLabel')}</span>
                    <span className="stat-value">{history.length}</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressChart;
