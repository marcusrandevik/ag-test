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

    // Limit history items: 6 for mobile, 10 for desktop
    const maxItems = isMobile ? 6 : 10;
    const displayHistory = history.length > maxItems
        ? history.slice(-maxItems)
        : history;

    // Calculate maxTime based on displayed items only to avoid outliers flattening the chart
    // Ensure minimum of 5s to prevent division by zero or extreme scaling for very fast times
    const maxTime = Math.max(...displayHistory.map(h => h.timeSeconds), 5);

    const barWidth = isMobile ? 45 : 40;
    const barSpacing = isMobile ? 55 : 60;
    const padding = { top: 20, right: 40, bottom: 40, left: 40 };
    const chartWidth = Math.max(300, displayHistory.length * barSpacing + padding.left + padding.right);
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    // Generate path for time line
    const timePoints = displayHistory.map((record, index) => {
        const x = padding.left + index * barSpacing + barWidth / 2; // Center of bar
        // Invert Y because SVG coordinates start from top
        // Scale time to fit in 70% of height to avoid overlap with high bars
        const y = padding.top + innerHeight - ((record.timeSeconds / maxTime) * (innerHeight * 0.7));
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="progress-chart">
            <h3>{i18n.t('chart.title')}</h3>
            <div className="chart-container">
                <svg width={chartWidth} height={chartHeight} className="chart-svg">
                    {/* Y-axis labels (Accuracy) */}
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

                    {/* Bars (Accuracy) */}
                    {displayHistory.map((record, index) => {
                        const barHeight = (record.accuracy / maxAccuracy) * innerHeight;
                        const x = padding.left + index * barSpacing + (barSpacing - barWidth) / 2;
                        const y = padding.top + innerHeight - barHeight;

                        // Calculate the actual attempt number (for labeling)
                        const attemptNumber = history.length > maxItems
                            ? history.length - maxItems + index + 1
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
                                    opacity="0.7"
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
                            </g>
                        );
                    })}

                    {/* Time Line */}
                    <polyline
                        points={timePoints}
                        fill="none"
                        stroke="#3498db"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Time Points */}
                    {displayHistory.map((record, index) => {
                        const x = padding.left + index * barSpacing + barWidth / 2;
                        const y = padding.top + innerHeight - ((record.timeSeconds / maxTime) * (innerHeight * 0.7));

                        // Calculate bar top position to check for overlap
                        const barHeight = (record.accuracy / maxAccuracy) * innerHeight;
                        const barTop = padding.top + innerHeight - barHeight;

                        // Improved label positioning logic
                        // Check if time label would overlap with accuracy label (within 25px)
                        const wouldOverlapAccuracy = Math.abs(y - barTop) < 25;

                        // If overlapping, try positioning below the point
                        // If point is in lower half of chart, position above instead
                        let labelY;
                        if (wouldOverlapAccuracy) {
                            // If point is in lower half, position above; otherwise below
                            labelY = y > (padding.top + innerHeight / 2) ? y - 15 : y + 20;
                        } else {
                            // Default: position above the point
                            labelY = y - 10;
                        }

                        const timeText = `${record.timeSeconds.toFixed(2)}s`;
                        const textWidth = timeText.length * 6; // Approximate width

                        return (
                            <g key={`time-${index}`}>
                                {/* White background rectangle for better visibility */}
                                <rect
                                    x={x - textWidth / 2 - 2}
                                    y={labelY - 10}
                                    width={textWidth + 4}
                                    height={14}
                                    fill="white"
                                    opacity="0.9"
                                    rx="2"
                                />
                                <circle cx={x} cy={y} r="4" fill="#3498db" stroke="white" strokeWidth="2" />
                                <text
                                    x={x}
                                    y={labelY}
                                    textAnchor="middle"
                                    className="time-label"
                                    fill="#3498db"
                                    fontWeight="bold"
                                >
                                    {timeText}
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
