export default {
    // Selection Screen
    selection: {
        title: "Multiplication Game",
        subtitle: "Select the tables you want to practice:",
        startButton: "Start Game",
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
        tablesCount: "{count} table",
        tablesCountPlural: "{count} tables",
        avgTimeLabel: "Avg Time",
        avgTimeSubtitle: "Per Question",
        playAgain: "Play Again",
        backToMenu: "Back to Menu",
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
