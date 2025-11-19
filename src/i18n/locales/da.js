export default {
    // Selection Screen
    selection: {
        title: "Multiplikationsspil",
        subtitle: "Vælg de tabeller, du vil øve:",
        start: "Start spil",
        viewHistory: "Se historik",
    },

    // Game Screen
    game: {
        back: "Tilbage",
        timeLabel: "Tid: {time} sekunder",
        questionFormat: "{a} x {b} =",
        placeholder: "?",
        checkButton: "Tjek",
    },

    // Game Results
    results: {
        title: "Spillet er færdigt! 🎉",
        scoreLabel: "Point",
        score: "Point",
        correct: "Korrekt",
        time: "Tid",
        avgTime: "Gns. tid",
        date: "Dato",
        scoreFormat: "{correct}/{total}",
        accuracyFormat: "{accuracy}% nøjagtighed",
        timeLabel: "Tid",
        timeValue: "{time}s",
        timeFeedback: {
            fast: "Lynhurtigt!",
            good: "Godt tempo!",
            slow: "Bliv ved med at øve!",
        },
        tablesLabel: "Tabeller",
        tables: "Tabeller",
        tablesCount: "{count} tabel",
        tablesCountPlural: "{count} tabeller",
        avgTimeLabel: "Gns. tid",
        avgTimeSubtitle: "Per spørgsmål",
        playAgain: "Spil igen",
        backToMenu: "Tilbage til menu",
        share: "Del resultater",
        generating: "Genererer...",
    },

    // History Screen
    history: {
        title: "Historik",
        noData: "Ingen spil spillet endnu.",
        noDataForFilter: "Ingen spil fundet for dette filter.",
        detailsTitle: "Spildetaljer",
        filterLabel: "Filtrer efter tabeller",
        allTables: "Alle tabeller",
    },

    // Progress Chart
    chart: {
        title: "Fremskridt historik",
        noData: "Ingen tidligere forsøg endnu. Bliv ved med at spille for at spore dine fremskridt!",
        attemptLabel: "#{number}",
        bestLabel: "Bedst:",
        averageLabel: "Gennemsnit:",
        totalAttemptsLabel: "Totalt antal forsøg:",
    },

    // Common
    common: {
        correct: "Korrekt!",
        incorrect: "Forkert! Det var {answer}",
        gameOver: "Spillet er slut! Point: {correct}/{total} korrekte. Tid: {time}s",
        allDone: "Færdig!",
    },
};
