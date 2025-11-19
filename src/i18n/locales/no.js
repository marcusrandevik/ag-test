export default {
    // Selection Screen
    selection: {
        title: "Multiplikasjonsspill",
        subtitle: "Velg gangetabellene du vil øve på:",
        startButton: "Start spill",
    },

    // Game Screen
    game: {
        back: "Tilbake",
        timeLabel: "Tid: {time} sekunder",
        questionFormat: "{a} x {b} =",
        placeholder: "?",
        checkButton: "Sjekk",
    },

    // Game Results
    results: {
        title: "Spillet er ferdig! 🎉",
        scoreLabel: "Poengsum",
        scoreFormat: "{correct}/{total}",
        accuracyFormat: "{accuracy}% nøyaktighet",
        timeLabel: "Tid",
        timeValue: "{time}s",
        timeFeedback: {
            fast: "Lynraskt!",
            good: "Bra tempo!",
            slow: "Fortsett å øve!",
        },
        tablesLabel: "Tabeller",
        tablesCount: "{count} tabell",
        tablesCountPlural: "{count} tabeller",
        avgTimeLabel: "Gj.snitt tid",
        avgTimeSubtitle: "Per spørsmål",
        playAgain: "Spill igjen",
        backToMenu: "Tilbake til meny",
    },

    // Progress Chart
    chart: {
        title: "Fremdriftshistorikk",
        noData: "Ingen tidligere forsøk ennå. Fortsett å spille for å spore fremgangen din!",
        attemptLabel: "#{number}",
        bestLabel: "Best:",
        averageLabel: "Gjennomsnitt:",
        totalAttemptsLabel: "Totalt antall forsøk:",
    },

    // Common
    common: {
        correct: "Riktig!",
        incorrect: "Feil! Det var {answer}",
        gameOver: "Spillet er over! Poengsum: {correct}/{total} riktige. Tid: {time}s",
        allDone: "Ferdig!",
    },
};
