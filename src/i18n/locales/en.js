export default {
    // Selection Screen
    selection: {
        title: "Multiplication Game",
        subtitle: "Select the tables you want to practice:",
        start: "Start Game",
        viewHistory: "View History",
        limitQuestions: "Limit number of questions",
        outOf: "out of {total} questions",
    },

    // Game Screen
    game: {
        back: "Back",
        timeLabel: "Time: {time} seconds",
        questionFormat: "{a} x {b} =",
        placeholder: "?",
        checkButton: "Check",
    },

    // Game Results
    results: {
        title: "Game Complete! 🎉",
        scoreLabel: "Score",
        score: "Score",
        correct: "Correct",
        time: "Time",
        avgTime: "Avg Time",
        date: "Date",
        scoreFormat: "{correct}/{total}",
        accuracyFormat: "{accuracy}% Accuracy",
        timeLabel: "Time",
        timeValue: "{time}s",
        timeFeedback: {
            fast: "Lightning fast!",
            good: "Great pace!",
            slow: "Keep practicing!",
        },
        tablesLabel: "Tables",
        tables: "Tables",
        tablesCount: "{count} table",
        tablesCountPlural: "{count} tables",
        avgTimeLabel: "Avg Time",
        avgTimeSubtitle: "Per Question",
        playAgain: "Play Again",
        backToMenu: "Back to Menu",
        share: "Share Results",
        generating: "Generating...",
    },

    // History Screen
    history: {
        title: "History",
        noData: "No games played yet.",
        noDataForFilter: "No games found for this filter.",
        detailsTitle: "Game Details",
        filterLabel: "Filter by tables",
        allTables: "All tables",
    },

    // Progress Chart
    chart: {
        title: "Progress History",
        noData: "No previous attempts yet. Keep playing to track your progress!",
        attemptLabel: "#{number}",
        bestLabel: "Best:",
        averageLabel: "Average:",
        totalAttemptsLabel: "Total Attempts:",
    },

    // Common
    common: {
        correct: "Correct!",
        incorrect: "Incorrect! It was {answer}",
        gameOver: "Game Over! Score: {correct}/{total} correct. Time: {time}s",
        allDone: "All Done!",
    },
};
