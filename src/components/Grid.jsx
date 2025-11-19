import React from 'react';

const Grid = ({ gridState, selectedTables }) => {
    const rows = Array.from({ length: 10 }, (_, i) => i + 1);
    const cols = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="grid-container">
            {/* Header Row */}
            <div className="grid-header-row">
                <div className="grid-cell header-cell"></div>
                {cols.map(col => (
                    <div key={`h-${col}`} className="grid-cell header-cell">{col}</div>
                ))}
            </div>

            {/* Grid Rows */}
            {rows.map(row => (
                <div key={`row-${row}`} className="grid-row">
                    {/* Row Header */}
                    <div className="grid-cell header-cell">{row}</div>

                    {/* Cells */}
                    {cols.map(col => {
                        const cellKey = `${row}-${col}`;
                        const state = gridState[cellKey] || 'default';
                        const isIncluded = selectedTables.includes(row);
                        // Note: The requirement says "The ones not unlucded will be greyed out".
                        // Assuming this means if the row's table isn't selected, it's greyed out.
                        // Or maybe it means only the specific cells that are part of the game?
                        // Let's interpret "greyed out" as visually distinct/disabled if not part of active tables.
                        // Actually, looking at the image, it seems like a full 10x10 grid is always shown.
                        // Let's stick to the plan: 10x10 grid.
                        // If a row is not in selectedTables, maybe we just show it as disabled?
                        // The prompt says: "The ones not unlucded will be greyed out".
                        // Let's implement a 'disabled' state for cells in rows that aren't selected.

                        const isDisabled = !selectedTables.includes(row);

                        return (
                            <div
                                key={cellKey}
                                className={`grid-cell ${state} ${isDisabled ? 'disabled' : ''}`}
                            >
                                {row}x{col}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Grid;
