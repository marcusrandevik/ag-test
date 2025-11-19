export default {
    // Selection Screen
    selection: {
        title: "Multiplikationsspel",
        subtitle: "Välj de tabeller du vill öva på:",
        start: "Starta spel",
        viewHistory: "Visa historik",
        limitQuestions: "Begränsa antal frågor",
        outOf: "av {total} frågor",
    },

    // Game Screen
    game: {
        back: "Tillbaka",
        timeLabel: "Tid: {time} sekunder",
        questionFormat: "{a} x {b} =",
        placeholder: "?",
        checkButton: "Kontrollera",
    },

    // Game Results
    results: {
        title: "Spelet är klart! 🎉",
        scoreLabel: "Poäng",
        score: "Poäng",
        correct: "Rätt",
        time: "Tid",
        avgTime: "Genomsn. tid",
        date: "Datum",
        scoreFormat: "{correct}/{total}",
        accuracyFormat: "{accuracy}% noggrannhet",
        timeLabel: "Tid",
        timeValue: "{time}s",
        timeFeedback: {
            fast: "Blixtsnabbt!",
            good: "Bra tempo!",
            slow: "Fortsätt öva!",
        },
        tablesLabel: "Tabeller",
        tables: "Tabeller",
        tablesCount: "{count} tabell",
        tablesCountPlural: "{count} tabeller",
        avgTimeLabel: "Genomsn. tid",
        avgTimeSubtitle: "Per fråga",
        playAgain: "Spela igen",
        backToMenu: "Tillbaka till menyn",
        share: "Dela resultat",
        generating: "Genererar...",
    },

    // History Screen
    history: {
        title: "Historik",
        noData: "Inga spel spelade än.",
        noDataForFilter: "Inga spel hittades för detta filter.",
        detailsTitle: "Speldetaljer",
        filterLabel: "Filtrera efter tabeller",
        allTables: "Alla tabeller",
    },

    // Progress Chart
    chart: {
        title: "Framstegshistorik",
        noData: "Inga tidigare försök än. Fortsätt spela för att spåra dina framsteg!",
        attemptLabel: "#{number}",
        bestLabel: "Bäst:",
        averageLabel: "Genomsnitt:",
        totalAttemptsLabel: "Totalt antal försök:",
    },

    // Common
    common: {
        correct: "Rätt!",
        incorrect: "Fel! Det var {answer}",
        gameOver: "Spelet är slut! Poäng: {correct}/{total} rätt. Tid: {time}s",
        allDone: "Klart!",
    },
};
